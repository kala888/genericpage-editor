import React, { PureComponent } from 'react'
import _ from 'lodash'
import { Button, Tabs } from 'antd'
import { connect } from 'dva'
import { createForm } from 'rc-form'
import styled from 'styled-components'
import SliderEditor from './common/slider-editor'

const { TabPane } = Tabs

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: #fff;
  min-height: 350px;
`
const Title = styled.div`
  padding-bottom: 10px;
`
const Brief = styled.div`
  margin-left: 20px;
  font-size: 12px;
`

const Content = styled.div`
  flex: 1;
  padding: 10px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 20px;
  justify-content: flex-end;
  align-items: center;
`

@connect(({ element }) => ({ ...element }))
class PropsEditor extends PureComponent {
  handleCancel = () => {}

  handleUpdate = () => {
    this.props.form.validateFields(async (error, values) => {
      const { item = {} } = this.props
      console.log('commit to', { ...item, ...values })
    })
    // NavigationService.dispatch('propsEditor/commit', this.props)
  }

  render() {
    const { editingId, form } = this.props
    const ele = this.props[editingId] || {}

    if (_.isEmpty(ele)) {
      return null
    }

    const { title = '组件', id, propList = [] } = ele

    console.log('props editor render', ele)

    return (
      <Container>
        <Title>
          {title}
          <Brief>
            组件ID：
            {id}
          </Brief>
        </Title>

        <Content>
          <Tabs defaultActiveKey="style-tabs">
            <TabPane tab="基本信息" key="base-info">
              基本信息，没想好放啥
            </TabPane>
            <TabPane tab="样式编辑" key="style-tabs">
              {propList.map(it => {
                console.log('slider', it)
                const defaultValue = ele[it.name] || it.defaultValue
                return (
                  <SliderEditor
                    key={it.id + id}
                    {...it}
                    defaultValue={defaultValue}
                    componentId={id}
                    form={form}
                  />
                )
              })}
            </TabPane>
          </Tabs>
        </Content>
        <Footer>
          <Button type="primary" onClick={this.handleUpdate}>
            应用
          </Button>
          <Button style={{ marginLeft: '20px' }} onClick={this.handleCancel}>
            取消
          </Button>
        </Footer>
      </Container>
    )
  }
}

export default createForm()(PropsEditor)
