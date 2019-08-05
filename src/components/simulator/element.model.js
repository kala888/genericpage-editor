import _ from 'lodash'

export default {
  namespace: 'element',
  state: {
    editingId: '', // 当前编辑的id
    // 同时存有以Id为key的对象属性
    dashedEditing: true,
  },
  reducers: {
    dashedEditing(state) {
      return {
        ...state,
        dashedEditing: !state.dashedEditing,
      }
    },
    clear() {
      return {
        editingId: '',
      }
    },
    removeItem(state, { payload }) {
      const { id } = payload
      return {
        ...state,
        [id]: {},
        editingId: '',
      }
    },
    clickToEdit(state, { payload }) {
      const { id } = payload

      const item = _.merge(state[id], payload)

      console.log('clickToEdit', item)

      // 原始item， // 存储propList 用于生成属性编辑器
      // {
      //   id: uuid(),
      //     componentType: 'carousel',
      //   title: '跑马灯',
      //   propList:[
      //   {id:'1', type: 'slider', name: 'marginHorizontal', title: '左右边距' },
      //   {id:'2', type: 'slider', name: 'marginVertical', title: '上下边距' },
      // ]
      // },
      return {
        ...state,
        editingId: id,
        [id]: item,
      }
    },
    updateProp(state, { payload }) {
      const { id } = payload
      const item = _.merge(state[id], payload)
      console.log('update props', item)

      return {
        ...state,
        [id]: item,
      }
    },
  },

  effects: {},
}
