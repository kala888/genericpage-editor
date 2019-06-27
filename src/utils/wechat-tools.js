// import VConsole from 'vconsole/dist/vconsole.min'
import { loadMiddleImg } from './image-tools'
import NavigationService from '../nice-router/navigation.service'
import config from './config'

// const vConsole = new VConsole()

console.log('1111')

function readyWrapper(fn) {
  return params => {
    window.wx.ready(() => {
      fn(params)
    })
  }
}

// https://github.com/yongheng2016/blog/issues/78
// ios 需要注册落地URL
function registryThisPage() {
  const uri = window.location.href.split('#')[0]
  signUrl(uri)
}

function signUrl(targetUrl = '+', onSuccess) {
  console.log('targetUrl', targetUrl)
  NavigationService.ajax(
    config.api.WXConfig,
    { url: targetUrl },
    {
      method: 'post',
      onSuccess: (resp = {}) => {
        const { appId, nonceStr, signature, timestamp } = resp
        window.wx.config({
          debug: false,
          appId,
          timestamp,
          nonceStr,
          signature,
          jsApiList: [
            'updateAppMessageShareData',
            'updateTimelineShareData',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'onMenuShareAppMessage',
            'onMenuShareTimeline',
            'chooseWXPay',
            // 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem',
            // 'translateVoice', 'startRecord', 'stopRecord', 'onRecordEnd', 'playVoice', 'pauseVoice',
            // 'stopVoice', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage',
            // 'downloadImage', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu',
            // 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard',
            // 'onMenuShareTimeline', 'onMenuShareAppMessage', 'updateAppMessageShareData', 'updateTimelineShareData',
          ],
          success: onSuccess,
        })
      },
    }
  )
}

function pay(params = {}) {
  const { timeStamp, nonceStr, package: wxPackage, signType, paySign } = params
  const { success, fail } = params
  window.wx.chooseWXPay({
    timestamp: timeStamp,
    nonceStr,
    package: wxPackage,
    signType,
    paySign,
    success,
    fail,
  })
}

function share(shareAction = {}) {
  const { imageUrl, linkToUrl, title, description = '', success } = shareAction
  const imgUrl = loadMiddleImg(imageUrl)
  window.wx.updateAppMessageShareData({
    title,
    desc: description,
    link: linkToUrl,
    imgUrl,
    success,
  })
  window.wx.updateTimelineShareData({
    title,
    link: linkToUrl,
    imgUrl,
    success,
  })
}

const WechatTools = {
  signUrl,
  registryThisPage,
  share: readyWrapper(share),
  pay: readyWrapper(pay),
}

export default WechatTools
