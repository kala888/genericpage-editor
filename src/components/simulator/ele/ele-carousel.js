import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 200px;
  border: 1px solid rebeccapurple;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`

class EleCarousel extends PureComponent {
  render() {
    const { title, border = '1px solid red' } = this.props

    return <Container style={{ border }}>{title}</Container>
  }
}

export default EleCarousel
