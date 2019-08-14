import url from 'url'
import qs from 'qs'
import _ from 'lodash'
import router from 'umi/router'

const getActionUri = (action) => {
  let result = action
  if (_.isObject(action)) {
    const { linkToUrl, uri } = action
    result = linkToUrl || uri
  }
  return result || ''
}

const NavigationService = {
  dispatch(action, params) {
    // eslint-disable-next-line no-underscore-dangle
    window.g_app._store.dispatch({
      type: action,
      payload: params,
    })
  },

  back() {
    router.goBack()
  },

  navigate(params) {
    if (!params) {
      return
    }
    const path = params.routeName || params || ''

    if (path.startsWith('http')) {
      window.location.href = path
      return
    }
    router.push(path)
  },

  view(uri, params = {}, options = {}) {
    const actionUri = getActionUri(uri)
    const urlData = url.parse(actionUri)
    const { protocol } = urlData
    if (protocol === 'page:') {
      const { query, pathname } = urlData
      const queryParams = qs.parse(query)
      const pageName = _.trim(pathname, '/')
      router.push(pageName, { ...params, ...queryParams })
      return
    }

    this.routeTo({ uri: actionUri, params, ...options })
  },

  ajax(uri, params, options = {}) {
    const actionUri = getActionUri(uri)
    this.routeTo({
      uri: actionUri,
      statInPage: true,
      loading: false,
      params,
      ...options,
    })
  },

  post(uri, params, options = {}) {
    const actionUri = getActionUri(uri)
    this.routeTo({ uri: actionUri, params, method: 'post', ...options })
  },

  async routeTo(action) {
    // const { uri: actionUri = '', cache = false, params } = action
    const { uri: actionUri = '', params } = action

    const uri = getActionUri(actionUri)

    console.log('************')
    console.log('start to NavigationService.routeTo, action uri :', uri)
    console.log('************')

    if (uri.length === 0) {
      return
    }

    // 1, 前端页面跳转, page:ArticleForm?type=qa 或跳转到Article的screen
    const urlData = url.parse(uri)
    const { protocol } = urlData
    if (protocol === 'page:') {
      const { query, pathname } = urlData
      const queryParams = qs.parse(query)
      const pageName = _.trim(pathname, '/')
      this.navigate(pageName, { ...params, ...queryParams })
      return
    }

    // 2, H5 页面跳转,all is h5
    // if (isH5Path(uri)) {
    //   this.navigate('H5Page', { uri })
    //   return
    // }

    // 3, 后端路由, 获取后端路由缓存
    // const cachedPage = await localCacheService.getCachedPage(uri)
    // console.log('go to cached page first', cachedPage)
    // // 如果缓存存在，做页面跳转
    // if (cachedPage) {
    //   this.navigate(cachedPage)
    //   // TODO
    //   console.log('need CACHE the DATA', cache)
    //   // if (cache) {
    //   //   return
    //   // }
    // }

    // 发送请求
    this.dispatch('niceRouter/route', {
      ...action,
      uri,
    })
  },
}

export default NavigationService
