import _ from 'lodash'

function replaceArray(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return srcValue
  }
}

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
      // const item = _.merge(state[id], payload)
      console.log('clickToEdit', payload)
      return {
        ...state,
        editingId: id,
        [id]: payload,
      }
    },
    saveValue(state, { payload }) {
      const { id } = payload
      console.log('payload......', payload)
      const item = _.mergeWith(state[id], payload, replaceArray)
      console.log('save props value', item)
      return {
        ...state,
        [id]: item,
      }
    },
  },

  effects: {},
}
