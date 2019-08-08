import _ from 'lodash'
import { message } from 'antd'
import { createAction } from '../../nice-router/nice-router-util'
import ModelTools from '../../nice-router/model-tools'
import EditorHelper from './editor-helper'

export default {
  namespace: 'editor',
  state: {
    scaleValues: [30, 50, 65, 75, 80, 90, 100],
    scaleIndex: 2,
    menuGroups: [],
    screen: [],
    dashedEditing: false,
  },
  effects: {
    *clearPage({ payload }, { put }) {
      console.log(payload)
      yield put(createAction('saveToStore')({ screen: [] }))
      yield put(createAction('element/clear')())
    },

    *removeItem({ payload }, { put }) {
      yield put(createAction('removeScreenItem')(payload))
      yield put(createAction('element/removeItem')(payload))
    },
    *dragToScreen({ payload }, { put, select }) {
      const { source, destination } = payload
      const currentState = yield select(state => state.editor)

      console.log('从侧栏拖元素到simulator的screen', source)

      const { menuGroups, screen } = currentState
      const sourceGroup = _.find(menuGroups, { groupId: source.droppableId })
      const { list: sourceList = [] } = sourceGroup
      const { list, item } = EditorHelper.copy(sourceList, screen, source, destination)
      yield put(createAction('saveToStore')({ screen: list }))
      yield put(createAction('element/clickToEdit')(item))
    },
  },
  reducers: {
    updateScreen(state, { payload }) {
      console.log('updateScreen', payload)
      return {
        ...state,
        screen: payload,
      }
    },
    save(state, { payload }) {
      const { statInPage, arrayMerge, ...resp } = payload
      const result = ModelTools.mergeState(state, resp, statInPage, arrayMerge)

      const { componentList = [], componentGroupList = [], uiPropertyList } = result

      const groupedUiProperties = _.groupBy(uiPropertyList, it => it.component.id)
      const enrichComp = componentList.map(it => ({
        ...it,
        propList: groupedUiProperties[it.id],
      }))
      const dataMap = _.groupBy(enrichComp, it => it.componentGroup.id)
      const menuGroups = componentGroupList.map(group => ({
        ...group,
        list: dataMap[group.id],
      }))

      return { ...state, menuGroups, ...result }
    },

    saveToStore(state, { payload }) {
      return { ...state, ...payload }
    },

    resetScale(state) {
      return {
        ...state,
        scaleIndex: 2,
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
