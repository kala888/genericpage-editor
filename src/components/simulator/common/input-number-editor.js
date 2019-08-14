import React from 'react'
import { Col, InputNumber, Row } from 'antd'
import NavigationService from '../../../nice-router/navigation.service'
import EditorHelper from '../editor-helper'

class InputNumberEditor extends React.Component {
  state = {
    inputValue: null,
  }

  updateProps = (inputValue) => {
    const { name, componentId } = this.props
    NavigationService.dispatch('element/saveValue', {
      id: componentId,
      values: {
        [name]: inputValue,
      },
    })
  }

  onChange = (inputValue) => {
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
