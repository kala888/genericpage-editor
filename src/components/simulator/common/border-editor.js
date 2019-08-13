import React from 'react'
import { Col, InputNumber, Row } from 'antd'
import { SketchPicker } from 'react-color'
import NavigationService from '../../../nice-router/navigation.service'
import EditorHelper from '../editor-helper'

class BorderEditor extends React.Component {
  state = {
    inputValue: null,
    color: '#fff',
    showFlag: true,
  }

  updateProps = inputValue => {
    const { name, componentId } = this.props
    NavigationService.dispatch('element/saveValue', {
      id: componentId,
      values: {
        [name]: inputValue,
      },
    })
  }

  onChange = inputValue => {
    this.setState(
      {
        inputValue,
      },
      () => {
        // form.setFieldsValue({ [name]: inputValue })
        this.updateProps(inputValue)
      }
    )
  }

  handleChangeComplete = color => {
    if (color) {
      this.setState({ color: color.hex })
    }
  }

  switchShowFlag = () => {
    this.setState(pre => ({ showFlag: !pre.showFlag }))
  }

  close = () => {
    this.setState({ showFlag: false })
  }

  render() {
    const { defaultValue = 0, form } = this.props
    const value = this.state.inputValue || defaultValue
    const { getFieldDecorator } = form
    const name = EditorHelper.getPropertyFormName(this.props)
    return (
      <div>
        <Row
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingBottom: '10px',
          }}
        >
          <Col span={4} style={{ alignSelf: 'flex-end' }}>
            边框宽度
          </Col>
          <Col span={16}>
            {getFieldDecorator(name, {
              initialValue: value,
            })(<InputNumber style={{ marginLeft: 16 }} onChange={this.onChange} size="small" />)}
          </Col>
        </Row>
        <Row
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingBottom: '10px',
          }}
        >
          <Col span={4} style={{ alignSelf: 'flex-end' }}>
            边框类型
          </Col>
          <Col span={16}>
            {getFieldDecorator(name, {
              initialValue: value,
            })(<InputNumber style={{ marginLeft: 16 }} onChange={this.onChange} size="small" />)}
          </Col>
        </Row>
        <Row
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingBottom: '10px',
          }}
          onClick={this.showColorPane}
        >
          <Col span={4} style={{ alignSelf: 'flex-end' }}>
            边框颜色
          </Col>
          <Col span={16}>
            <div
              style={{
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
              }}
              onClick={this.switchShowFlag}
            >
              <div
                style={{
                  width: '36px',
                  height: '14px',
                  borderRadius: '2px',
                  background: this.state.color,
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
                  <SketchPicker color={this.state.color} onChange={this.handleChangeComplete} />
                  <div
                    onClick={this.close}
                    style={{
                      alignSelf: 'flex-end',
                      marginTop: '-30px',
                      fontSize: '12px',
                      padding: '5px',
                    }}
                  >
                    隐藏
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>
        <Row style={{ display: 'flex', alignItems: 'center' }}>
          <Col span={4} style={{ alignSelf: 'flex-end' }}>
            边框位置
          </Col>
        </Row>
      </div>
    )
  }
}

export default BorderEditor
