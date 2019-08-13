import React from 'react'
import styled from 'styled-components'
import EditorHelper from '../editor-helper'

const Container = styled.div`
  height: 200px;
  border: 1px solid rebeccapurple;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`

// eslint-disable-next-line react/prefer-stateless-function
class EleCarousel extends React.Component {
  render() {
    const { title } = this.props
    const style = EditorHelper.calcStyle(this.props.values)
    console.log('carousel.....', style)

    return <Container style={style}>{title}</Container>
  }
}

export default EleCarousel
