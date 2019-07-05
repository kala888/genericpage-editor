import React, { PureComponent } from 'react'
import { Button, Checkbox, Form, Input, Modal } from 'antd'
import styled from 'styled-components'
import { showFormError } from '../../../utils'

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0px;
`

class NewPagePopup extends PureComponent {
  state = {
    visible: false,
  }

  showNewPagePopup = () => {
    this.setState({
      visible: true,
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  handleOk = () => {
    this.props.form.validateFields((error, values) => {
      console.log(error, values)
      if (error) {
        console.log(error)
        showFormError(error)
        return
      }
      this.setState({
        visible: false,
      })
      console.log('values', values)
    })
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      layout: 'horizontal',
    }
    return (
      <Container>
        <Button
          type="dashed"
          block
          onClick={this.showNewPagePopup}
          style={{ backgroundColor: 'transparent' }}
        >
          +新建页面
        </Button>
        <Modal
          visible={this.state.visible}
          title="新建页面"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form {...formItemLayout}>
            <Form.Item label="页面标题">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    max: 8,
                    message: '标题最少1个字，最多8个字',
                  },
                ],
              })(<Input placeholder="页面标题" />)}
            </Form.Item>

            <Form.Item label="提示语">
              {getFieldDecorator('brief', {
                rules: [
                  {
                    max: 20,
                    message: '提示语，最多20个字',
                  },
                ],
              })(<Input placeholder="不会展示到实际页面上，只是用来辅助记忆的" />)}
            </Form.Item>

            <Form.Item label="快捷可选操作" style={{ margin: '20px' }}>
              {getFieldDecorator('hasPopup', {})(<Checkbox>弹出框</Checkbox>)}
              {getFieldDecorator('hasFab', {})(<Checkbox>浮动按钮</Checkbox>)}
              {getFieldDecorator('hasForm', {})(<Checkbox>表单页面</Checkbox>)}
            </Form.Item>
          </Form>
        </Modal>
      </Container>
    )
  }
}

export default Form.create()(NewPagePopup)
