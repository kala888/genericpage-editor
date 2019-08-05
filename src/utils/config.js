import viewConfig from './viewmapping.config'
// const baseURL = 'https://www.biubiuguai.com/mobile-testing/'
const baseURL = 'https://demo.doublechaintech.com/tao/'

const niceRouterConfig = {
  baseURL,
  version: 53,
  appType: 'CommunityUser',
  viewConfig,
  backendRouterPageKeyBlackList: ['refreshPage/', 'goBack/', 'goPrevious/'],
  backendRouterPageBlackList: ['NetworkException', 'EditProfileForm', 'Login', 'Me', 'UserDetail'],
  api: {
    FooterHome: 'projectManager/view/P000001/',
    ViewPage: 'pageManager/view/:id/',
    AddPage: 'projectManager/addPage/projectId/title/brief/content/none/',
    RemovePage: 'projectManager/removePageList/projectId/pageIds/none/',
    CopyPage: 'projectManager/copyPageFrom/:projectId/:pageId/1/none/',
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
