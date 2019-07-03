import uuid from 'uuid/v4'
import { message } from 'antd'
import SimulatorTools from './simulator-tools'
import { createAction } from '../../nice-router/nice-router-util'

const mockList = [
  {
    id: uuid(),
    componentType: 'store-location',
    title: '店铺',
  },
  {
    id: uuid(),
    componentType: 'carousel',
    title: '跑马灯',
    propList: [
      { id: '1', type: 'slider', name: 'marginHorizontal', title: '左右边距' },
      { id: '2', type: 'slider', name: 'marginVertical', title: '上下边距' },
    ],
  },
  {
    id: uuid(),
    componentType: 'image',
    title: '轮播',
  },
  {
    id: uuid(),
    componentType: 'article',
    title: '文章',
  },
  {
    id: uuid(),
    componentType: 'swipe-message',
    title: '滚动小消息',
  },
  {
    id: uuid(),
    componentType: 'button',
    title: 'button',
  },
]

export default {
  namespace: 'simulator',
  state: {
    scaleValues: [30, 50, 65, 75, 80, 90, 100],
    scaleIndex: 2,

    pageList: [],
    elementMenuList: mockList,
    screen: [],
  },
  effects: {
    *removeItem({ payload }, { put }) {
      yield put(createAction('removeScreenItem')(payload))
      yield put(createAction('element/removeItem')(payload))
    },
  },
  reducers: {
    resetScale(state) {
      return {
        ...state,
        scaleIndex: 2,
      }
    },
    removeScreenItem(state, { payload }) {
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
      console.log('do reorderMenuList', payload)
      // 从侧栏 排序
      const { source, destination } = payload
      const preList = state[source.droppableId]
      const list = SimulatorTools.reorder(preList, source.index, destination.index)
      return {
        ...state,
        [destination.droppableId]: list,
      }
    },

    dragToScreen(state, { payload }) {
      // 从侧栏拖元素到simulator的screen
      const { source, destination } = payload
      const { elementMenuList, screen } = state
      const list = SimulatorTools.copy(elementMenuList, screen, source, destination)
      return {
        ...state,
        screen: list,
      }
    },
    moveInScreen(state, { payload }) {
      // simulator的screen上，在source和dest 之间移动元素
      const { source, destination } = payload

      const switchedResult = SimulatorTools.move(
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
