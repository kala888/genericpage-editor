import _ from 'lodash'
import NavigationService from '../../nice-router/navigation.service'
import Config from '../../utils/config'
import { createAction } from '../../nice-router/nice-router-util'

export default {
  namespace: 'page',
  state: {},
  reducers: {},
  effects: {
    *savePage({ payload }, { put }) {
      yield put(createAction('save')(payload))
      const { content = '[]' } = payload
      let screen = []
      try {
        screen = JSON.parse(content)
        console.log('screen 2', screen, _.isString(screen))
        if (!_.isObjectLike(screen)) {
          screen = []
        }
      } catch (e) {
        console.log('not a json')
      }
      console.log('screen is', screen)
      yield put(createAction('editor/updateScreen')(screen))
    },
    *saveScreenToPage({ payload }, { select }) {
      const currentState = yield select(state => state.editor)
      const page = yield select(state => state.page)
      const { screen } = currentState
      console.log('save screen to remote', screen, payload)
      NavigationService.post(Config.api.UpdatePage, {
        projectId: page.project.id,
        id: page.id,
        title: page.title,
        brief: page.brief,
        content: JSON.stringify(screen),
      })
    },
  },
}
