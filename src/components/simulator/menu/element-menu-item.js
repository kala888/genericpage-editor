import React from 'react'
import { Icon } from 'antd'
import styled from 'styled-components'

const Container = styled.div`
  padding: 0px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`
const Text = styled.div`
  margin-left: 15px;
`

function ElementMenuItem(props) {
  const { icon = 'file-image', title } = props
  return (
    <Container>
      <Icon type={icon} style={{ fontSize: '16px' }} />
      <Text>{title}</Text>
    </Container>
  )
}

export default ElementMenuItem
