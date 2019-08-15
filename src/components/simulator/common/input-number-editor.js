import React from 'react'
import { Col, InputNumber, Row } from 'antd'
import EditorHelper from '../editor-helper'

class InputNumberEditor extends React.Component {
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
    const { minLength, maxLength, defaultValue = 0, title, form } = this.props
    const value = this.state.inputValue || defaultValue
    const { getFieldDecorator } = form
    const name = EditorHelper.getPropertyFormName(this.props)
    return (
      <Row style={{ display: 'flex', alignItems: 'center' }}>
        <Col span={4} style={{ alignSelf: 'flex-end' }}>
          {title}
        </Col>
        <Col span={16}>
          {getFieldDecorator(name, {
            initialValue: value,
          })(
            <InputNumber
              min={minLength}
              max={maxLength}
              style={{ marginLeft: 16 }}
              onChange={this.onChange}
              size='small'
            />
          )}
        </Col>
      </Row>
    )
  }
}

export default InputNumberEditor
