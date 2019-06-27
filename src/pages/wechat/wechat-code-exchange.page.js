import React, { PureComponent } from 'react'
import _ from 'lodash'
import { modelConnect } from '../../nice-router/model-tools'
import NavigationService from '../../nice-router/navigation.service'

const cache = {}

// eslint-disable-next-line react/prefer-stateless-function
@modelConnect('wechatCodeExchange')
class WechatCodeExchangePage extends PureComponent {
  processCodeExchange = () => {
    const {
      wechatCodeExchange: { root } = {},
      location: { query = {} },
    } = this.props
    if (cache[query.code]) {
      return
    }
    if (query.code) {
      NavigationService.view(query.targetUrl, { code: query.code })
      cache[query.code] = true
      return
    }

    if (_.isEmpty(root)) {
      return
    }
    const { baseAuthUrl, targetUrl } = root

    const target = encodeURIComponent(targetUrl)
    const url = `${window.location.href}?targetUrl=${target}`
    const currentPath = encodeURIComponent(url)
    const uri = `${baseAuthUrl}&redirect_uri=${currentPath}#wechat_redirect`
    window.location = uri
    // http://biubiuguai.com/doublechain/wechat/code-exchange?targetUrl=customerPushWechatCodeToServer%2F%3Acode%2F&code=071kz2Dg1eMllt0JC8Eg1EwZCg1kz2Da&state=doublechain
  }

  render() {
    console.log('render....')
    this.processCodeExchange()
    return (
      <div className="row center" style={{ height: '100%' }}>
        微信认证中，请稍等。。。
        {}
      </div>
    )
  }
}

export default WechatCodeExchangePage
