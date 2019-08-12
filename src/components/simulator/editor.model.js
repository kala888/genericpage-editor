import _ from 'lodash'
import { message } from 'antd'
import { createAction } from '../../nice-router/nice-router-util'
import EditorHelper from './editor-helper'
import NavigationService from '../../nice-router/navigation.service'
import Config from '../../utils/config'

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
  namespace: 'editor',
  state: {
    project: {},
    page: {},
    screen: [],
    scaleValues: [30, 50, 65, 75, 80, 90, 100],
    dashedEditing: false,
    scaleIndex: 2,
    pageList: [],
    componentGroups: [],
  },
  effects: {
    *saveProject({ payload }, { put }) {
      // componentGroups 在左侧"页面编辑器"里显示可以使用的component
      const { componentList = [], componentGroupList = [], uiPropertyList } = payload
      const groupedUiProperties = _.groupBy(uiPropertyList, it => it.component.id)
      const components = {}
      _.forEach(componentList, it => {
        components[it.type] = {
          ...it,
          propList: groupedUiProperties[it.id],
        }
      })

      const dataMap = _.groupBy(componentList, it => it.componentGroup.id)
      const componentGroups = componentGroupList.map(group => ({
        ...group,
        list: dataMap[group.id].map(it => components[it.type]),
      }))

      yield put(
        createAction('save')({
          project: payload,
          componentGroups,
          components,
        })
      )
    },

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
      yield put(
        createAction('save')({
          page: payload,
          screen,
        })
      )
    },
    *clearScreen({ payload }, { put }) {
      console.log(payload)
      yield put(createAction('saveScreen')([]))
      yield put(createAction('element/clear')())
    },
    *removeItem({ payload }, { put }) {
      yield put(createAction('removeScreenItem')(payload))
      yield put(createAction('element/removeItem')(payload))
    },

    *saveToRemote({ payload }, { select }) {
      const editor = yield select(state => state.editor)
      const { page, project, screen } = editor
      const element = yield select(state => state.element)
      const { title, brief, id } = page
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

    *dragToScreen({ payload }, { put, select }) {
      const { source, destination } = payload
      console.log('从侧栏拖元素到screen', source)
      const { componentGroups, page = {} } = yield select(state => state.editor)
      const { screen } = page
      const sourceGroup = _.find(componentGroups, { groupId: source.droppableId })
      const { list: sourceList = [] } = sourceGroup
      const { list, item } = EditorHelper.copy(sourceList, screen, source, destination)
      yield put(createAction('page/saveScreen')(list))
      yield put(createAction('element/clickToEdit')(item))
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
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
    resetScale(state) {
      return {
        ...state,
        scaleIndex: 2,
      }
    },

    scale(state, { payload }) {
      const { decrease } = payload
      const { scaleIndex, scaleValues } = state
      const nextIndex = decrease ? scaleIndex - 1 : scaleIndex + 1
      if (nextIndex === scaleValues.length || nextIndex === -1) {
        message.info('到头了')
        return state
      }
      return {
        ...state,
        scaleIndex: nextIndex,
      }
    },

    reorderMenuList(state, { payload }) {
      console.log('侧栏 排序', payload)
      const { source, destination } = payload
      const preList = state[source.droppableId]
      const list = EditorHelper.reorder(preList, source.index, destination.index)
      return {
        ...state,
        [destination.droppableId]: list,
      }
    },

    moveInScreen(state, { payload }) {
      console.log('页面的screen上，在source和dest 之间移动元素', payload)
      const { source, destination } = payload

      const switchedResult = EditorHelper.move(
        state[source.droppableId],
        state[destination.droppableId],
        source,
        destination
      )

      return {
        ...state,
        ...switchedResult,
      }
    },
  },
}
