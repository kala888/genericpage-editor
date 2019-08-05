import _ from 'lodash'
import NiceRouter from './nice-router'
import StorageTools from './storage-tools'

function getPageKeyByUri(uri = '') {
  let key = uri
  if (key.length > 0) {
    const ary = _.split(_.trim(uri, '/'), '/')
    let end = ary.length
    if (ary[0] !== 'customerEntryPointClicked' && ary[0] !== 'onChannelClicked') {
      end = ary.length > 3 ? ary.length - 1 : 2
    }
    key = `${_.slice(ary, 0, end).join('/')}/`
  }
  key = `${StorageTools.PageCachePrefix}${key}`
  return key
}

function inBlackList(key, page) {
  console.log('backendRouterPageBlackList', NiceRouter.config)
  const result =
    NiceRouter.config.backendRouterPageBlackList.includes(page) ||
    NiceRouter.config.backendRouterPageKeyBlackList.includes(key)
  console.log('key and page is in black list?', result)
  return result
}

const LocalCache = {
  ...StorageTools,
}

// 后端路由缓存
LocalCache.saveBackendRouter = async (uri, page) => {
  const key = getPageKeyByUri(uri)
  console.log('start save backend router to cache, uri:', uri, ', page:', page)
  if (!inBlackList(key, page)) {
    // 缓存前端路由3天
    if (key.length > 0) {
      StorageTools.set(key, page, 60 * 24 * 3)
    }
  }
}

// 后端路由缓存
LocalCache.getCachedPage = async uri => {
  const key = getPageKeyByUri(uri)
  console.log('keykeykeykeykey', key)
  const pageName = await StorageTools.get(key)
  return pageName
}

// 查看 Form是否被提交成功
LocalCache.isCachedForm = async (url, params = {}) => {
  if (_.isEmpty(params)) {
    return false
  }
  const content = JSON.stringify(params)
  const key = `${url}_${content}`
  return StorageTools.isExpired(key)
}
// form 提交内容 缓存 3 分钟
LocalCache.cacheForm = async (url, params = {}) => {
  if (!_.isEmpty(params)) {
    const content = JSON.stringify(params)
    const key = `${url}_${content}`
    StorageTools.set(key, params, 3)
  }
}

export default LocalCache
