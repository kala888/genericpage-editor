import _ from 'lodash'
import NiceRouter from './nice-router'

const ViewMappingService = {
  getView(backendKey = '') {
    const viewMapping = NiceRouter.config.viewConfig.view
    const [key, instanceId] = _.split(backendKey, '@')
    let result = viewMapping[key] || {}
    if (!_.isEmpty(result) && instanceId) {
      result = _.clone(result)
      result.pageName = `${result.pageName}${instanceId}`
      if (result.stateAction) {
        result.stateAction = _.replace(result.stateAction, '/', `${instanceId}/`)
      }
    }
    console.log(`find view mapping for class '${backendKey}'`, result)
    return result
  },
  getError(errorKey) {
    const errorMapping = NiceRouter.config.viewConfig.error
    const result = _.get(errorMapping, errorKey, {})
    return result
  },
}

export default ViewMappingService
