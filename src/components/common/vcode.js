import React, { PureComponent } from 'react'
import { Button, InputItem } from 'antd-mobile'
import NavigationService from '../../nice-router/navigation.service'

import config from '../../utils/config'

const MAX_COUNTER = 59

// const MAX_COUNTER = 9

export default class VCode extends PureComponent {
  state = {
    count: 0,
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  sendSMSCode = () => {
    const { getPhoneNumber } = this.props
    let count = MAX_COUNTER
    const that = this
    if (this.state.count === 0) {
      if (getPhoneNumber) {
        getPhoneNumber((phoneNumber = '') => {
          that.setState({ count }, () => {
            //  VerifyCode: 'sendVerifyCodeBySMS/:sceneCode/:userMobile/',
            NavigationService.ajax(config.api.VerifyCode, {
              sceneCode: 'register',
              userMobile: phoneNumber.replace(/\s+/g, ''),
            })
          })
          that.interval = setInterval(() => {
            count -= 1
            that.setState({ count })
            if (count === 0) {
              clearInterval(that.interval)
            }
          }, 1000)
        })
      }
    }
  }

  render() {
    const { label = '获取验证码', getPhoneNumber, ...others } = this.props
    const { count } = this.state
    const message = count ? `${count} s` : label
    return (
      <InputItem
        maxLength={6}
        size="large"
        type="digit"
        placeholder="请输入6位验证码"
        extra={
          <Button
            className="btn_extra"
            disabled={count}
            style={{
              marginTop: -5,
            }}
            size="small"
            onClick={this.sendSMSCode}
          >
            {message}
          </Button>
        }
        {...others}
      />
    )
  }
}
