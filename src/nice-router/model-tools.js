/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
/* eslint-disable no-return-assign */

import _ from 'lodash'
import { connect } from 'dva/index'

function replaceArray(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return srcValue
  }
}

function apppendArray(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return _.concat(objValue, srcValue)
  }
}

function save(state, payload, namespace) {
  const { statInPage, arrayMerge, stateName = 'root', ...resp } = payload

  const { viewHashString } = resp
  const preHash = (state[stateName] || {}).viewHashString
  if (!_.isEmpty(viewHashString) && preHash === viewHashString) {
    return {}
  }

  const result = {}
  result[stateName] = resp

  // 如果是数组，就替换掉，OOTB的Merge会合并两个数组
  if (statInPage) {
    console.log('do data merge', payload)
    let processor = apppendArray
    if (arrayMerge === 'replace') {
      processor = replaceArray
    }
    result[stateName] = _.mergeWith({}, state[stateName], resp, processor)
  }
  console.log('update', namespace, 'module', result)
  return result
}

const createDefault = namespace => ({
  namespace,
  state: {
    root: {},
    loading: false,
  },
  effects: {},
  reducers: {
    save(state, { payload }) {
      const result = save(state, payload, namespace)
      console.log('doooooo, model save')
      return { ...state, ...result }
    },
    saveToStore(state, { payload }) {
      return { ...state, ...payload }
    },
  },
})

const mergeModel = (namespace, instance) => {
  const baseModel = createDefault(namespace)
  if (instance) {
    return _.merge(baseModel, instance)
  }
  return baseModel
}

export function modelConnect(...modelList) {
  modelList.map(namespace => {
    const isModleCreated = _.find(window.g_app._models, it => it.namespace === namespace)
    if (!isModleCreated) {
      window.g_app.model(createDefault(namespace))
    }
  })

  return target => {
    const mapStateToProps = state => {
      let newState = {}

      _.forEach(modelList, (it, index) => {
        if (index === 0) {
          const temp = state[it] || {}
          newState = {
            ...temp,
          }
        }
        newState[it] = state[it]
      })

      return newState
    }

    return connect(mapStateToProps)(target)
  }
}

export default {
  save,
  mergeModel,
  createDefault,
}
