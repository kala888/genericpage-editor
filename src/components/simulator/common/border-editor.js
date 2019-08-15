import React from 'react'
import { Col, Icon, InputNumber, Row, Select } from 'antd'
import ColorEditor from './color-editor'
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

  onWidthChange = (width) => {
    console.log('111', width)
    this.setState({ width }, () => this.updateBorder())
  }

  handleChangeComplete = (color) => {
    this.setState({ color }, () => this.updateBorder())
  }

  switchShowFlag = () => {
    this.setState((pre) => ({ showFlag: !pre.showFlag }))
  }

  close = () => {
    this.setState({ showFlag: false })
  }

  onPositionChange = (position) => {
    this.setState((pre) => ({ [position]: !pre[position] }), () => this.updateBorder())
  }

  onTypeChange = (option) => {
    this.setState({ type: option }, () => this.updateBorder())
  }

  updateBorder = () => {
    const { width, color, type, left, right, top, bottom } = this.state
    const result = {}
    const borderStyle = `${width}px ${type} ${color}`
    result.borderLeft = left && width > 0 ? borderStyle : ''
    result.borderRight = right && width > 0 ? borderStyle : ''
    result.borderTop = top && width > 0 ? borderStyle : ''
    result.borderBottom = bottom && width > 0 ? borderStyle : ''
    result.extra = {
      width,
      color,
      type,
      left,
      right,
      top,
      bottom,
    }

    const { name, componentId } = this.props
    EditorHelper.updateStyle({ name, componentId, value: result })
  }

  render() {
    const { width, color, type, left, right, top, bottom } = this.state
    return (
      <div style={{ marginTop: '20px' }}>
        <Row style={{ color: '#999' }}>边框属性</Row>
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
            <InputNumber style={{ marginLeft: 16 }} onChange={this.onWidthChange} size='small' defaultValue={width} />
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
            <Select defaultValue={type} style={{ width: 90, marginLeft: 16 }} onChange={this.onTypeChange} size='small'>
              <Option value='solid'>实线</Option>
              <Option value='dashed'>虚线</Option>
              <Option value='dotted'>点状线</Option>
              <Option value='double'>双线</Option>
            </Select>
          </Col>
        </Row>

        <ColorEditor onChangeComplete={this.handleChangeComplete} title='边框颜色' defaultValue={color} />

        <Row style={{ display: 'flex', alignItems: 'center' }}>
          <Col span={4} style={{ alignSelf: 'flex-end' }}>
            边框位置
          </Col>
          <Col span={16} style={{ alignSelf: 'flex-end' }}>
            <Icon
              type='border-top'
              style={{
                fontSize: '25px',
                marginLeft: '16px',
                color: top ? defaultSelectedColor : defaultColor,
              }}
              onClick={() => this.onPositionChange('top')}
            />
            <Icon
              type='border-right'
              style={{
                fontSize: '25px',
                marginLeft: '16px',
                color: right ? defaultSelectedColor : defaultColor,
              }}
              onClick={() => this.onPositionChange('right')}
            />
            <Icon
              type='border-bottom'
              style={{
                fontSize: '25px',
                marginLeft: '16px',
                color: bottom ? defaultSelectedColor : defaultColor,
              }}
              onClick={() => this.onPositionChange('bottom')}
            />
            <Icon
              type='border-left'
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
