/* eslint-disable no-underscore-dangle,import/no-extraneous-dependencies */
import axios from 'axios' // https://www.kancloud.cn/yunye/axios/234845
import _ from 'lodash'
import qs from 'qs'
import pathToRegexp from 'path-to-regexp'
import NavigationService from './navigation.service'
import { LoadingType } from './nice-router-util'
import NiceRouter from './nice-router'
import ViewMappingService from './viewmapping.service'
import OverlayLoading from './overlay-loading'
import NiceMessage from './nice-message'
import emitter from './events'

const systemErrorXClass = 'com.terapico.moyi.NetworkException'

async function showLoading(loading) {
  if (!loading || !loading.type || loading.type === LoadingType.none) {
    return
  }
  if (loading.type === LoadingType.modal) {
    OverlayLoading.showLoadingModal()
    return
  }
  NavigationService.dispatch('loading/start', loading)
}

async function hideLoading(loading) {
  console.log('hide loading', loading)
  if (!loading || !loading.type || loading.type === LoadingType.none) {
    return
  }
  if (loading.type === LoadingType.modal) {
    OverlayLoading.hideLoadingModal()
    return
  }
  NavigationService.dispatch('loading/end', loading)
}

function toast(msg) {
  NiceMessage.sad(msg, 5000)
}

function showError({ xclass, data = {} }) {
  console.log('request got error', data)
  const { localizedMessage, messageList, message } = data

  if (xclass === systemErrorXClass) {
    return
  }

  const { message: localMessage } = ViewMappingService.getError(xclass)
  if (localMessage) {
    return
  }

  if (localizedMessage) {
    toast(localizedMessage)
    return
  }

  if (messageList) {
    const error = messageList.map(msg => msg.body).join('\n')
    toast(error)
    return
  }

  if (message) {
    toast(message)
    return
  }

  console.log(`开发调试错误信息:${JSON.stringify(data)}`)
}

const HttpRequest = {
  showDebugFlag: false,
  initial(params = {}) {
    const { version } = params
    axios.defaults.baseURL = NiceRouter.config.baseURL
    axios.defaults.withCredentials = true
    axios.defaults.headers.common['X-App-Type'] = NiceRouter.config.appType
    axios.defaults.headers.common['X-App-Version'] = version || NiceRouter.config.version
    // axios.defaults.headers.common['Accept-Encoding'] = 'gzip, deflate'  // TODO why android don't support gzip
    // axios.defaults.headers.common['Accept-Encoding'] = 'deflate'
  },

  _isFailedResult({ xclass, data }) {
    if (!_.isObjectLike(data)) {
      return false
    }
    return xclass ? xclass.endsWith('Exception') : false
  },

  _fetch(options) {
    const { method = 'get', params, ...others } = options
    let { uri } = options
    const cloneData = _.cloneDeep(params)

    let domain = ''
    if (uri.match(/[a-zA-z]+:\/\/[^/]*/)) {
      ;[domain] = uri.match(/[a-zA-z]+:\/\/[^/]*/)
      uri = uri.slice(domain.length)
    }
    const match = pathToRegexp.parse(uri)
    uri = pathToRegexp.compile(uri)(params)
    match.forEach(item => {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    })

    uri = domain + uri

    switch (method.toLowerCase()) {
      case 'get':
        return axios.get(uri, {
          ...others,
          params: cloneData,
        })
      case 'delete':
        return axios.delete(uri, {
          ...others,
          data: cloneData,
        })
      case 'post':
        return axios.post(uri, qs.stringify(cloneData), {
          ...others,
          headers: {
            ...others.headers,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
      case 'put':
        return axios.put(uri, cloneData, others)
      case 'patch':
        return axios.patch(uri, cloneData, others)
      default:
        return axios(options)
    }
  },

  _logResp(response) {
    console.log('%c****************************', 'color:#40aad8')
    console.log(`%c*  ${response.config.method} to ${response.config.url}`, 'color:40aad8')
    console.log('%c*  X-Class:', 'color:#40aad8', response.headers['x-class'])
    console.log('%c*  X-Env-Type:', 'color:#40aad8', response.headers['x-env-type'])
    console.log('%c*  JSON Data:', 'color:#40aad8', response.data)
    console.log('%c*  response:', 'color:#40aad8', response)
    // console.groupEnd()
    console.log('%c****************************', 'color:#40aad8')
  },

  async send(options = {}, loading) {
    if (!axios.defaults.baseURL) {
      this.initial()
    }

    if (loading) {
      showLoading(loading)
    }
    // AuthTools.loadCookies()
    // const token = await AuthTools.getTokenAsync()

    let result = {}
    try {
      const resp = await this._fetch({
        ...options,
        headers: {
          ...options.headers,
          // authorization: token,
        },
      })

      this._logResp(resp)

      const xclass = resp.headers['x-class']
      const xredirect = resp.headers['x-redirect']
      const xenvtype = resp.headers['x-env-type'] || 'product'
      if (xenvtype !== 'product' && !HttpRequest.showDebugFlag) {
        emitter.emit('showDebugFlag')
        HttpRequest.showDebugFlag = true
      }

      const { statusText, status, data } = resp
      result = {
        xclass,
        xredirect,
        data,
        message: statusText,
        status,
      }
    } catch (error) {
      const { status } = error
      console.log('Request exception', JSON.stringify(error))
      result = {
        xclass: systemErrorXClass,
        message: `error code:${status}`,
        data: {
          ...(error.response || {}),
        },
      }
    }
    const success = !this._isFailedResult(result)
    result.success = success
    if (!success) {
      showError(result)
    }
    hideLoading(loading)
    return result
  },
}

export default HttpRequest
