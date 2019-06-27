import React from 'react'
import { Button } from 'antd-mobile'

import emitter from '../../nice-router/events'

const defaultImageUrl = require('../../assets/images/downloadtips.png')

const bodyEl = document.body
let top = 0

function stopBodyScroll(isFixed) {
  if (isFixed) {
    top = window.scrollY

    bodyEl.style.position = 'fixed'
    bodyEl.style.top = `${-top}px`
  } else {
    bodyEl.style.position = ''
    bodyEl.style.top = ''

    window.scrollTo(0, top) // 回到原先的top
  }
}

export default class MaskModal extends React.PureComponent {
  constructor(props, context) {
    super(props, context)
    this.state = {
      show: false,
    }
  }

  componentDidMount() {
    emitter.on('showMaskModal', this.handleChangeState)
  }

  componentWillUnmount() {
    emitter.removeListener('showMaskModal', this.handleChangeState)
  }

  handleChangeState = (show = false) => {
    if (show) {
      this.showModal()
    } else {
      this.onClose()
    }
  }

  showModal = () => {
    this.setState(
      {
        show: true,
      },
      () => {
        stopBodyScroll(true)
      }
    )
  }

  onClose = () => {
    this.setState(
      {
        show: false,
      },
      () => {
        stopBodyScroll(false)
      }
    )
  }

  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.showModal)
      return
    }
    this.showModal()
  }

  render() {
    const {
      imageUrl = defaultImageUrl,
      style = {},
      buttonStyle = {},
      closeable = true,
    } = this.props
    return (
      <div style={style}>
        {!!this.props.children && (
          <Button style={buttonStyle} onClick={this.handleClick}>
            {this.props.children}
          </Button>
        )}

        <div
          style={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(9, 9, 9, 0.63)',
            zIndex: 9999999,
            display: this.state.show ? 'block' : 'none',
          }}
          onClick={() => {
            if (closeable) {
              this.onClose()
            }
          }}
        >
          <img style={{ width: '100%' }} alt="" src={imageUrl} />
        </div>
      </div>
    )
  }
}
