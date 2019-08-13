import React from 'react'
import { Col, Icon, Input, InputNumber, Row, Select } from 'antd'
import { SketchPicker } from 'react-color'
import NavigationService from '../../../nice-router/navigation.service'
import EditorHelper from '../editor-helper'

const defaultSelectedColor = '#F5A623'
const defaultColor = '#999'

const { Option } = Select

class BorderEditor extends React.Component {
  constructor(props, context) {
    super(props, context)
    const {
      defaultValue: {
        extra = {
          width: 1,
          color: defaultColor,
          type: 'solid',
          left: true,
          right: true,
          top: true,
          bottom: true,
        },
      } = {},
    } = props
    this.state = {
      ...extra,
    }
  }

  onWidthChange = width => {
    console.log('111', width)
    this.setState({ width }, () => this.updateBorder())
  }

  handleChangeComplete = color => {
    if (color) {
      this.setState({ color: color.hex }, () => this.updateBorder())
    }
  }

  switchShowFlag = () => {
    this.setState(pre => ({ showFlag: !pre.showFlag }))
  }

  close = () => {
    this.setState({ showFlag: false })
  }

  onPositionChange = position => {
    this.setState(pre => ({ [position]: !pre[position] }), () => this.updateBorder())
  }

  onTypeChange = option => {
    this.setState({ type: option }, () => this.updateBorder())
  }

  updateBorder = () => {
    const { width, color, type, left, right, top, bottom } = this.state
    const result = {}
    if (width > 0) {
      const borderStyle = `${width}px ${type} ${color}`
      result.borderLeft = left ? borderStyle : ''
      result.borderRight = right ? borderStyle : ''
      result.borderTop = top ? borderStyle : ''
      result.borderBottom = bottom ? borderStyle : ''
      result.extra = { width, color, type, left, right, top, bottom }

      const { name, componentId } = this.props
      NavigationService.dispatch('element/saveValue', {
        id: componentId,
        values: {
          [name]: result,
        },
      })
    }
  }

  render() {
    const { defaultValue = {}, form } = this.props
    const { getFieldDecorator } = form
    const name = EditorHelper.getPropertyFormName(this.props)
    const { width, color, type, left, right, top, bottom } = this.state
    return (
      <div style={{ marginTop: '20px' }}>
        <Row style={{ color: '#999' }}>边框属性</Row>
        {getFieldDecorator(name, { initialValue: JSON.stringify(defaultValue) })(<Input />)}
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
            <InputNumber
              style={{ marginLeft: 16 }}
              onChange={this.onWidthChange}
              size="small"
              defaultValue={width}
            />
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
            <Select
              defaultValue={type}
              style={{ width: 90, marginLeft: 16 }}
              onChange={this.onTypeChange}
              size="small"
            >
              <Option value="solid">实线</Option>
              <Option value="dashed">虚线</Option>
              <Option value="dotted">点状线</Option>
              <Option value="double">双线</Option>
            </Select>
          </Col>
        </Row>
        <Row
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingBottom: '10px',
          }}
        >
          <Col span={4}>边框颜色</Col>
          <Col span={16}>
            <div
              style={{
                padding: '5px',
                background: '#fff',
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
        <Row style={{ display: 'flex', alignItems: 'center' }}>
          <Col span={4} style={{ alignSelf: 'flex-end' }}>
            边框位置
          </Col>
          <Col span={16} style={{ alignSelf: 'flex-end' }}>
            <Icon
              type="border-top"
              style={{
                fontSize: '25px',
                marginLeft: '16px',
                color: top ? defaultSelectedColor : defaultColor,
              }}
              onClick={() => this.onPositionChange('top')}
            />
            <Icon
              type="border-right"
              style={{
                fontSize: '25px',
                marginLeft: '16px',
                color: right ? defaultSelectedColor : defaultColor,
              }}
              onClick={() => this.onPositionChange('right')}
            />
            <Icon
              type="border-bottom"
              style={{
                fontSize: '25px',
                marginLeft: '16px',
                color: bottom ? defaultSelectedColor : defaultColor,
              }}
              onClick={() => this.onPositionChange('bottom')}
            />
            <Icon
              type="border-left"
              style={{
                fontSize: '25px',
                marginLeft: '16px',
                color: left ? defaultSelectedColor : defaultColor,
              }}
              onClick={() => this.onPositionChange('left')}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default BorderEditor
