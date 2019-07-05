import uuid from 'uuid/v4'
import _ from 'lodash'
import { message } from 'antd'
import SimulatorTools from './simulator-tools'
import { createAction } from '../../nice-router/nice-router-util'

const defaultPropList = [
  { id: '1', type: 'slider', name: 'marginHorizontal', title: '左右边距' },
  { id: '2', type: 'slider', name: 'marginVertical', title: '上下边距' },
]

const mockData = [
  {
    groupId: 'menu-items-base',
    title: '基础组件',
    list: [
      {
        id: uuid(),
        iconFont: 'icon-anniu',
        componentType: 'button',
        title: '按钮',
        propList: defaultPropList,
      },
      {
        id: uuid(),
        icon: 'font-size',
        componentType: 'text',
        title: '文字',
        propList: defaultPropList,
      },
      {
        id: uuid(),
        icon: 'picture',
        componentType: 'image',
        title: '图片',
        propList: defaultPropList,
      },
      {
        id: uuid(),
        iconFont: 'icon-lunboping',
        componentType: 'carousel',
        title: '跑马灯',
        propList: defaultPropList,
      },
      {
        id: uuid(),
        iconFont: 'icon-lunbo_sel',
        componentType: 'white-space',
        title: '空行',
        propList: defaultPropList,
      },
      {
        id: uuid(),
        icon: 'line',
        componentType: 'break-line',
        title: '分隔符',
        propList: defaultPropList,
      },
    ],
  },
  {
    groupId: 'menu-items-form',
    title: '表格组件',
    list: [
      {
        id: uuid(),
        icon: 'edit',
        componentType: 'input',
        title: '输入框',
        propList: defaultPropList,
      },
      {
        id: uuid(),
        icon: 'cloud-upload',
        componentType: 'image-picker',
        title: '图片上传',
        propList: defaultPropList,
      },
      {
        id: uuid(),
        icon: 'check-square',
        componentType: 'checkbox',
        title: '复选框',
        propList: defaultPropList,
      },
      {
        id: uuid(),
        icon: 'check-circle',
        componentType: 'radio',
        title: '单选框',
        propList: defaultPropList,
      },
      {
        id: uuid(),
        iconFont: 'icon-switch',
        componentType: 'switch',
        title: '滑动选择器',
        propList: defaultPropList,
      },
      {
        id: uuid(),
        iconFont: 'icon-xiala',
        componentType: 'picker',
        title: '下拉选择器',
        propList: defaultPropList,
      },
      {
        id: uuid(),
        icon: 'border',
        componentType: 'textarea',
        title: '大输入框',
        propList: defaultPropList,
      },
      {
        id: uuid(),
        iconFont: 'icon-duanxinyanzhengma',
        componentType: 'vcode',
        title: '验证码',
        propList: defaultPropList,
      },
    ],
  },
  {
    groupId: 'menu-items-layout',
    title: '页面组件',
    list: [
      {
        id: uuid(),
        iconFont: 'icon-danchuchuang',
        componentType: 'popup',
        title: '页面弹出框',
        propList: defaultPropList,
      },
      {
        id: uuid(),
        iconFont: 'icon-dibudaohang',
        componentType: 'footer-tabs',
        title: '底部footer',
        propList: defaultPropList,
      },
      {
        id: uuid(),
        iconFont: 'icon-hekriconzhuijiaanniuanniu',
        componentType: 'fab',
        title: '浮动Fab',
        propList: defaultPropList,
      },
    ],
  },

  {
    groupId: 'menu-items-biz',
    title: '业务组件',
    list: [
      {
        id: uuid(),
        icon: 'shop',
        componentType: 'store-location',
        title: '店铺',
        propList: defaultPropList,
      },
      {
        id: uuid(),
        iconFont: 'icon-huadongdaohang',
        componentType: 'box-bar',
        title: '楼层箱子',
        propList: defaultPropList,
      },
      {
        id: uuid(),
        icon: 'read',
        componentType: 'article',
        title: '文章',
        propList: defaultPropList,
      },
      {
        id: uuid(),
        icon: 'sound',
        componentType: 'message-swiper',
        title: '滚动消息',
        propList: defaultPropList,
      },
      {
        id: uuid(),
        icon: 'qrcode',
        componentType: 'qrcode',
        title: '二维码',
        propList: defaultPropList,
      },
      {
        id: uuid(),
        icon: 'ellipsis',
        componentType: 'more-action',
        title: '...更多',
        propList: defaultPropList,
      },
      {
        id: uuid(),
        icon: 'ordered-list',
        componentType: 'listof',
        title: '列表',
        propList: defaultPropList,
      },
    ],
  },
]

export default {
  namespace: 'simulator',
  state: {
    scaleValues: [30, 50, 65, 75, 80, 90, 100],
    scaleIndex: 2,

    pageList: [],
    menuGroups: mockData,
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
      // 从侧栏拖元素到simulator的screen
      const currentState = yield select(state => state.simulator)
      console.log(currentState)
      const { source, destination } = payload
      const { menuGroups, screen } = currentState
      const sourceGroup = _.find(menuGroups, { groupId: source.droppableId })
      const { list: sourceList = [] } = sourceGroup
      const { list, item } = SimulatorTools.copy(sourceList, screen, source, destination)
      yield put(createAction('saveToStore')({ screen: list }))
      yield put(createAction('element/clickToEdit')(item))
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
