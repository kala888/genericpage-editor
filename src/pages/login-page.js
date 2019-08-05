import React from 'react'
import { Button, Form, Icon, Input } from 'antd'
import NavigationService from '../nice-router/navigation.service'

class LoginPage extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        NavigationService.view('secUserManager/login/:userId/:password/', values, {
          onSuccess: () => {
            NavigationService.ajax(
              'secUserManager/selectApp/UA000001/',
              {},
              {
                onSuccess: () => NavigationService.navigate('/'),
              }
            )
          },
        })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('userId', {
            initialValue: 'SU000001',
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            initialValue: 'admin123',
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ maxWidth: '300px' }}>
            登录
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(LoginPage)
