import ViewMapping from './viewmapping.config'

const baseURL = 'https://www.biubiuguai.com/mobile-testing/'

const niceRouterConfig = {
  baseURL,
  version: 53,
  appType: 'CommunityUser',
  viewConfig: {
    view: ViewMapping.view,
    error: ViewMapping.error,
  },
  backendRouterPageKeyBlackList: ['refreshPage/', 'goBack/', 'goPrevious/'],
  backendRouterPageBlackList: ['NetworkException', 'EditProfileForm', 'Login', 'Me', 'UserDetail'],
  api: {
    VerifyCode: '',
    FooterHome:'viewHomePage/'
  },
}

const Config = {
  ...niceRouterConfig,
  name: 'H5 Start',
  oss: {
    ossBucket: 'doublechain-public',
    staticUrl: 'https://doublechain-public.oss-cn-beijing.aliyuncs.com/',
    endPoint: 'oss-cn-beijing.aliyuncs.com',
  },
}

console.log('***********   current env  ***********   ')
console.log('config.js is', Config)
export default Config
