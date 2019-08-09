import _ from 'lodash'
import { message } from 'antd'
import { createAction } from '../../nice-router/nice-router-util'
import ModelTools from '../../nice-router/model-tools'
import EditorHelper from './editor-helper'

export default {
  namespace: 'editor',
  state: {
    scaleValues: [30, 50, 65, 75, 80, 90, 100],
    dashedEditing: false,
    scaleIndex: 2,
    pageList: [],
    componentGroups: [],
  },
  effects: {
    *clearPage({ payload }, { put }) {
      console.log(payload)
      yield put(createAction('page/saveScreen')([]))
      yield put(createAction('element/clear')())
    },

    *removeItem({ payload }, { put }) {
      yield put(createAction('page/removeScreenItem')(payload))
      yield put(createAction('element/removeItem')(payload))
    },

    *dragToScreen({ payload }, { put, select }) {
      const { source, destination } = payload
      console.log('从侧栏拖元素到screen', source)
      const { componentGroups } = yield select(state => state.editor)
      const { screen } = yield select(state => state.page)
      const sourceGroup = _.find(componentGroups, { groupId: source.droppableId })
      const { list: sourceList = [] } = sourceGroup
      const { list, item } = EditorHelper.copy(sourceList, screen, source, destination)
      yield put(createAction('page/saveScreen')(list))
      yield put(createAction('element/clickToEdit')(item))
    },
  },
  reducers: {
    save(state, { payload }) {
      const { statInPage, arrayMerge, ...resp } = payload
      const result = ModelTools.mergeState(state, resp, statInPage, arrayMerge)

      // componentGroups 在左侧"页面编辑器"里显示可以使用的component
      const { componentList = [], componentGroupList = [], uiPropertyList } = result
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

      return {
        ...state,
        ...result,
        componentGroups,
        components,
      }
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
