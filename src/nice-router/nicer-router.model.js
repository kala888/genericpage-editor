// eslint-disable-next-line import/no-extraneous-dependencies
import { createAction, LoadingType, noop } from './nice-router-util'
import ViewMappingService from './viewmapping.service'
import BackendService from './backend.service'
import LocalCache from './local-cache.service'
import PopupMessage from './popup-message'
import NiceMessage from './nice-message'
import NavigationService from './navigation.service'

function getActionUrl(listMetaInfo = {}) {
  const { actions: { nextPageAction: { linkToUrl } = {} } = {}, nextPageUrl } = listMetaInfo
  return linkToUrl || nextPageUrl || ''
}

export default {
  namespace: 'niceRouter',
  state: {
    latestRoute: {},
    isShow: true,
    // onStart: noop,
    // onSuccess: noop,
    // onFail: noop,
    // onComplete: noop,
  },
  reducers: {
    saveLatestRoute(state, { payload }) {
      return { ...state, latestRoute: payload }
    },
  },

  effects: {
    *retry(action, { put, select }) {
      const { latestRoute } = yield select((state) => state.app)
      if (latestRoute) {
        yield put(createAction('route')(latestRoute))
      }
    },
    *fetchNext({ payload }, { put }) {
      const { listMeta = {}, onSuccess = noop } = payload

      const linkToUrl = getActionUrl(listMeta)
      const { hasNextPage = true } = listMeta

      console.log('fetch next page', listMeta)
      if (!hasNextPage || !linkToUrl || linkToUrl.length === 0) {
        console.log('there is no nextpage', payload)
        return
      }

      yield put(
        createAction('route')({
          uri: linkToUrl,
          statInPage: true,
          arrayMerge: 'append',
          onSuccess,
        })
      )
    },
    *route({ payload }, { call, put }) {
      console.log('niceRouter/router payload', payload)

      const {
        statInPage = false,
        method = 'get',
        uri,
        params = {},
        cache,
        asForm,
        arrayMerge = 'replace',
        onSuccess = noop,
        loading = { type: LoadingType.top },
      } = payload
      let { effectAction, stateAction } = payload

      console.log('onSuccess', onSuccess)

      if (!uri) {
        console.warn('store.modules.router.route","can not send empty url to backend')
        return
      }

      if (loading && asForm) {
        loading.type = LoadingType.modal
      }
      if (asForm) {
        const cached = yield LocalCache.isCachedForm(uri, params)
        if (cached) {
          NiceMessage.sad('您的操作太快了，请稍后再试，或者换句话试试', 1000 * 3)
          return
        }
      }

      put(createAction('saveLatestRoute')(payload))

      const remoteRequestParams = {
        method,
        uri,
        params,
        asForm,
        headers: {},
        loading,
      }
      const resp = yield call(BackendService.send, remoteRequestParams)

      const { success, xclass, xredirect, data } = resp
      if (data.toast) {
        NiceMessage.show(data.toast)
      }

      if (data.popup) {
        PopupMessage.show(data.popup)
      }

      onSuccess(data, { success, xredirect, xclass })

      // console.log("current page", wx.pro)
      if (success) {
        const pageViewMapping = ViewMappingService.getView(xclass)
        const { pageName } = pageViewMapping

        stateAction = stateAction || pageViewMapping.stateAction
        effectAction = effectAction || pageViewMapping.effectAction

        console.log('response status, success?', success)
        console.log('commit stateAction', stateAction)
        console.log('commit effectAction', effectAction)

        if (asForm) {
          LocalCache.cacheForm(uri, params)
        }

        const storeData = {
          ...data,
          statInPage,
          arrayMerge,
        }
        if (stateAction) {
          yield put(createAction(stateAction)(storeData))
        }
        if (effectAction) {
          yield put(createAction(effectAction)(storeData))
        }
        // if ((xredirect || (!xredirect && !statInPage))
        // && currentPage !== `pages${viewMapping}`) {
        // 1.如果没有设置class 和page 的映射，则不跳转
        // 2.否则，2.1 如果后台告诉我强制跳转，就跳转
        // 2.2 如果后台没告诉强制跳转，也没有设置statInPage，就跳转。既前台说是ajax，既后台默认容许了
        // const sameAsCurrentPage = LATEST_PAGE === url
        // console.log("latest page is", LATEST_PAGE, "current url is", url, "sameAsCurrentPage", sameAsCurrentPage)
        if (pageName && (xredirect || (!xredirect && !statInPage))) {
          yield NavigationService.navigate({ routeName: pageName })
        }
        if (cache || !asForm) {
          LocalCache.saveBackendRouter(uri, pageName)
        }
      }
    },
  },
  subscriptions: {},
}
