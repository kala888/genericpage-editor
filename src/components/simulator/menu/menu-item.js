import React from 'react'
import { Icon } from 'antd'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Text = styled.div`
  font-size: 13px;
  margin-top: 5px;
`
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1278303_17omuh4msvi.js',
})

function MenuItem(props) {
  const { icon = '', iconFont = '', title } = props
  return (
    <Container>
      {iconFont.length > 0 ? (
        <IconFont type={iconFont} style={{ fontSize: '20px' }} />
      ) : (
        <Icon type={icon} style={{ fontSize: '20px' }} />
      )}

      <Text>{title}</Text>
    </Container>
  )
}

export default MenuItem
