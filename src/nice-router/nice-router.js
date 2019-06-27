import _ from 'lodash'

const defaultViewConfig = {
  'com.terapico.moyi.NetworkException': {
    pageName: 'NetworkErrorPage',
  },
}

const defaultConfig = {
  baseURL: '',
  version: 1,
  appType: 'H5Page',
  api: {},
  viewConfig: {
    view: defaultViewConfig,
    error: {},
  },
  backendRouterPageBlackList: [],
  backendRouterPageKeyBlackList: [],
}

const NiceRouterStatus = {
  initial: 0,
  done: 1,
}

const NiceRouter = {
  config: {},
  status: NiceRouterStatus.initial,
}

NiceRouter.start = ({ config = {} }) => {
  NiceRouter.config = _.merge(defaultConfig, config)
  NiceRouter.status = NiceRouterStatus.done

  return NiceRouter
}

export default NiceRouter
