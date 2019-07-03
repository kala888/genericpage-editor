import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 200px;
  border: 1px solid rebeccapurple;
  display: flex;
  justify-content: center;
  align-items: center;
`

class EleCarousel extends PureComponent {
  render() {
    const { title, marginHorizontal = 0, marginVertical = 0, border = '1px solid red' } = this.props

    return (
      <Container style={{ border, margin: `${marginVertical}px ${marginHorizontal}px` }}>
        {title}
      </Container>
    )
  }
}

export default EleCarousel
