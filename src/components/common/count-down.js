import React from 'react'
import { Button } from 'antd-mobile'

const defaultTime = 60
// const defaultTime = 60

export default class CountDown extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false,
      time: defaultTime,
    }
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
  }

  onPress = () => {
    if (!this.state.disabled) {
      this.setState({ disabled: true }, () => {
        if (this.props.onClick) {
          this.props.onClick()
        }
        this.countdown()
      })
    }
  }

  countdown = () => {
    const that = this
    const timeScheduler = () => {
      that.timer && clearTimeout(that.timer)
      const time = that.state.time - 1
      that.setState({ time }, () => {
        if (time > 0) {
          that.timer = setTimeout(timeScheduler, 1000)
        } else {
          that.setState({
            disabled: false,
            time: this.props.time ? that.props.time : defaultTime,
          })
        }
      })
    }

    this.timer = setTimeout(timeScheduler, 1000)
  }

  render() {
    const btnText = this.state.disabled ? `${this.state.time} s...` : `${this.props.text}`
    return (
      <Button
        style={{ alignSelf: 'center', marginTop: -5 }}
        onClick={this.onPress}
        disabled={this.state.disabled}
        className="btn_extra"
        size="small"
      >
        <div className="grey f14">{btnText}</div>
      </Button>
    )
  }
}
