import React, { Component } from 'react'
import { Col, InputNumber, Row, Slider } from 'antd'
import _ from 'lodash'
import NavigationService from '../../../nice-router/navigation.service'

class SliderEditor extends Component {
  state = {
    inputValue: null,
  }

  updateProps = _.throttle(inputValue => {
    const { name, componentId } = this.props
    NavigationService.dispatch('element/updateProp', {
      id: componentId,
      [name]: inputValue,
    })
  }, 200)

  onChange = inputValue => {
    const { name, form } = this.props
    this.setState(
      {
        inputValue,
      },
      () => {
        form.setFieldsValue({ [name]: inputValue })
        this.updateProps(inputValue)
      }
    )
  }

  render() {
    const { name, min = 0, max = 50, defaultValue = 0, title, form } = this.props
    const value = this.state.inputValue || defaultValue
    const { getFieldDecorator } = form
    console.log('slider-editor', this.props)

    return (
      <Row style={{ display: 'flex', alignItems: 'center' }}>
        <Col span={4}>{title}</Col>
        <Col span={12}>
          <Slider
            min={min}
            max={max}
            onChange={this.onChange}
            value={typeof value === 'number' ? value : 0}
          />
        </Col>
        <Col span={4}>
          {getFieldDecorator(name, {
            initialValue: value,
          })(
            <InputNumber min={min} max={max} style={{ marginLeft: 16 }} onChange={this.onChange} />
          )}
        </Col>
      </Row>
    )
  }
}

export default SliderEditor
