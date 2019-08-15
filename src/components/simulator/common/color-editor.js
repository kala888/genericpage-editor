import React from 'react'
import { Col, Row } from 'antd'
import { SketchPicker } from 'react-color'
import EditorHelper from '../editor-helper'

class ColorEditor extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      color: props.defaultValue || 'transparent',
      showFlag: false,
    }
  }

  handleChangeComplete = (colorObj) => {
    const { onChangeComplete, name, componentId } = this.props
    if (colorObj) {
      const color = colorObj.hex
      this.setState({ color }, () => {
        if (onChangeComplete) {
          onChangeComplete(color)
          return
        }
        EditorHelper.updateStyle({ name, componentId, value: color })
      })
    }
  }

  switchShowFlag = () => {
    this.setState((pre) => ({ showFlag: !pre.showFlag }))
  }

  close = () => {
    this.setState({ showFlag: false })
  }

  render() {
    const { title } = this.props
    const { color } = this.state
    return (
      <Row>
        <Col span={4}>{title}</Col>
        <Col span={16}>
          <div
            style={{
              padding: '5px',
              background: 'transparent',
              borderRadius: '3px',
              boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
              display: 'inline-block',
              cursor: 'pointer',
              marginLeft: '16px',
            }}
          >
            <div
              onClick={this.switchShowFlag}
              style={{
                width: '36px',
                height: '14px',
                borderRadius: '4px',
                boxShadow: '0 0 0 0.3px rgba(0,0,0,.1)',
                background: color,
              }}
            />
            {this.state.showFlag && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                }}
              >
                <SketchPicker color={color} onChange={this.handleChangeComplete} />
                <div
                  onClick={this.close}
                  style={{
                    alignSelf: 'flex-end',
                    marginTop: '-30px',
                    fontSize: '12px',
                    padding: '5px',
                    zIndex: 9999,
                    fontWeight: '500',
                  }}
                >
                  隐藏
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>
    )
  }
}

export default ColorEditor
