import _ from 'lodash'
import NiceRouter from './nice-router'

const ViewMappingService = {
  getView(backendKey = '') {
    const result = _.get(NiceRouter.config.viewConfig, _.trim(backendKey), {})
    console.log(`find view mapping for class '${backendKey}'`, result)
    return result
  },
}

export default ViewMappingService
