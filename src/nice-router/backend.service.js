import _ from 'lodash'
import HttpRequest from './http-request'
import mockData from './mock-data'

const EMPTY_PARAMETER_TOKEN = '+'
const BackendService = {}

const replaceUrlPlaceholder = (pUri, params) => {
  let lastParams = params
  let uri = pUri
  if (!_.isEmpty(params) || _.trim(pUri)) {
    lastParams = _.cloneDeep(params)
    _.keys(params).forEach(key => {
      const tmp = `:${key}`
      if (tmp && uri.indexOf(tmp) > -1) {
        uri = uri.replace(tmp, params[key] || EMPTY_PARAMETER_TOKEN)
        _.unset(lastParams, key)
      }
    })
  }
  return { uri, lastParams }
}

function removeEmptyValues(params = {}) {
  const result = {}
  _.forIn(params, (value, key) => {
    if (!_.isUndefined(value) && !_.isNull(value)) {
      result[key] = value
    }
  })
  return result
}

BackendService.send = async (action = {}) => {
  const { method = 'get', uri, params = {}, headers = {}, loading, asForm } = action
  console.log('backend.backendRouter, action is ', action)

  const { uri: actionUri, lastParams } = replaceUrlPlaceholder(uri, params)
  let data = removeEmptyValues(lastParams)
  if (asForm) {
    data = { formData: JSON.stringify(data) }
  }
  const options = {
    uri: actionUri,
    method,
    params: data,
    headers,
  }

  if (actionUri === 'mock/') {
    return mockData
  }
  const response = await HttpRequest.send(options, loading)
  return response
}

export default BackendService
