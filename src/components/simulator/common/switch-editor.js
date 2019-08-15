import React from 'react'
import { Col, Row, Switch } from 'antd'

class SwitchEditor extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      checked: props.defaultValue || false,
    }
  }

  handleChange = () => {
    this.setState((pre) => ({ checked: !pre.checked }))
  }

  render() {
    const { title } = this.props
    return (
      <Row style={{ display: 'flex', alignItems: 'center' }}>
        <Col span={4}>{title}</Col>
        <Col span={12}>
          <Switch checked={this.state.checked} onChange={this.handleChange} />
        </Col>
      </Row>
    )
  }
}

export default SwitchEditor
