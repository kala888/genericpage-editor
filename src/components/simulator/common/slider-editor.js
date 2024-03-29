import React from 'react'
import { Col, InputNumber, Row, Slider } from 'antd'
import EditorHelper from '../editor-helper'

class SliderEditor extends React.Component {
  state = {
    inputValue: null,
  }

  onChange = (inputValue) => {
    const { name, componentId } = this.props
    this.setState(
      {
        inputValue,
      },
      () => {
        // form.setFieldsValue({ [name]: inputValue })
        EditorHelper.updateStyle({ name, componentId, value: inputValue })
      }
    )
  }

  render() {
    const { min = 0, max = 100, defaultValue = 100, title, form } = this.props
    const value = this.state.inputValue || defaultValue
    const { getFieldDecorator } = form
    console.log('slider-editor', this.props)
    const name = EditorHelper.getPropertyFormName(this.props)
    return (
      <Row style={{ display: 'flex', alignItems: 'center' }}>
        <Col span={4}>{title}</Col>
        <Col span={12}>
          <Slider min={min} max={max} onChange={this.onChange} value={typeof value === 'number' ? value : 0} />
        </Col>
        <Col span={4}>
          {getFieldDecorator(name, {
            initialValue: value,
          })(
            <InputNumber
              min={min}
              max={max}
              style={{ marginLeft: 16 }}
              onChange={this.onChange}
              size='small'
              formatter={(v) => `${v}%`}
              parser={(v) => v.replace('%', '')}
            />
          )}
        </Col>
      </Row>
    )
  }
}

export default SliderEditor
