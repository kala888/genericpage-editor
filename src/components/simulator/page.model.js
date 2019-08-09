import _ from 'lodash'
import NavigationService from '../../nice-router/navigation.service'
import Config from '../../utils/config'
import { createAction } from '../../nice-router/nice-router-util'

function parseAsObj(content, defaultValue) {
  if (!content) {
    return defaultValue
  }
  try {
    const result = JSON.parse(content)
    if (_.isObjectLike(result)) {
      return result
    }
  } catch (e) {
    console.log('not a json')
  }
  return defaultValue
}

export default {
  namespace: 'page',
  state: {
    screen: [],
  },
  reducers: {
    saveScreen(state, { payload }) {
      return {
        ...state,
        screen: payload,
      }
    },
    removeScreenItem(state, { payload }) {
      console.log('从页面中移除', payload)
      const screen = state.screen.filter(it => it.id !== payload.id)
      return {
        ...state,
        screen,
      }
    },
  },
  effects: {
    *savePage({ payload }, { put, select }) {
      const { content } = payload
      const editor = yield select(state => state.editor)
      const components = parseAsObj(content, [])
      const screen = components.map(it => {
        const comp = editor.components[it.type] || {}
        return {
          ...comp,
          ...it,
          values: it.values,
        }
      })

      yield put(createAction('save')({ ...payload, screen }))
    },
    *saveToRemote({ payload }, { select }) {
      const page = yield select(state => state.page)
      const element = yield select(state => state.element)
      const { screen = [], project, title, brief, id } = page
      console.log('save screen to remote', screen, payload)
      const list = screen.map(comp => {
        const { type } = comp
        const ele = element[comp.id] || {}
        return {
          id: comp.id,
          type,
          values: ele.values,
        }
      })

      NavigationService.post(Config.api.UpdatePage, {
        projectId: project.id,
        id,
        title,
        brief,
        content: JSON.stringify(list),
      })
    },
  },
}
