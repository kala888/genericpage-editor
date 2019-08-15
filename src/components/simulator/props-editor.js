import React, { PureComponent } from 'react'
import _ from 'lodash'
import { Tabs } from 'antd'
import { connect } from 'dva'
import { createForm } from 'rc-form'
import styled from 'styled-components'
import InputNumberEditor from './common/input-number-editor'
import EditorHelper from './editor-helper'
import SliderEditor from './common/slider-editor'
import BorderEditor from './common/border-editor'
import ColorEditor from './common/color-editor'
import ImageEditor from './common/image-editor'
import SwitchEditor from './common/switch-editor'

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

@connect(({ element }) => ({ ...element }))
class PropsEditor extends PureComponent {
  handleCancel = () => {}

  handleUpdate = () => {
    this.props.form.validateFields(async (error, values) => {
      const ele = this.props[this.props.editingId] || {}
      const { id } = ele
      const { item = {} } = this.props

      const params = {}
      // eslint-disable-next-line array-callback-return
      _.keys(values).map((it) => {
        params[EditorHelper.getPropertyName(it)] = values[it]
      })

      console.log('commit to', { values: { ...item, ...params }, id })
    })
    // NavigationService.dispatch('propsEditor/commit', this.props)
  }

  render() {
    const { editingId, form } = this.props
    const ele = this.props[editingId] || {}

    if (_.isEmpty(ele)) {
      return null
    }

    const { title = '组件', id, propList = [], styleValues = {}, values = {}, properties = [] } = ele

    console.log('props-editor render', ele)

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
          <Tabs defaultActiveKey='style-tabs'>
            <TabPane tab='基本信息' key='base-info'>
              {properties.map((it) => {
                console.log('...it', it)
                const defaultValue = values[it.name] || it.defaultValue
                const key = `${it.id}:${id}`
                const itemProps = {
                  ...it,
                  defaultValue,
                  componentId: id,
                  key,
                }
                return (
                  <div key={it.id}>
                    {it.type === 'image' && <ImageEditor {...itemProps} />}
                    {it.type === 'switch' && <SwitchEditor {...itemProps} />}
                  </div>
                )
              })}
            </TabPane>
            <TabPane tab='样式编辑' key='style-tabs'>
              {propList.map((it) => {
                const defaultValue = styleValues[it.name] || it.defaultValue
                const key = `${it.id}:${id}`
                const itemProps = {
                  ...it,
                  defaultValue,
                  componentId: id,
                  form,
                  key,
                }
                return (
                  <div key={key} style={{ paddingBottom: '10px' }}>
                    {it.type === 'slider' && <SliderEditor {...itemProps} />}
                    {it.type === 'border' && <BorderEditor {...itemProps} />}
                    {it.type === 'color' && <ColorEditor {...itemProps} />}
                    {!it.type && <InputNumberEditor {...itemProps} />}
                  </div>
                )
              })}
            </TabPane>
          </Tabs>
        </Content>
      </Container>
    )
  }
}

export default createForm()(PropsEditor)
