import React from 'react'
import styled from 'styled-components'
import EditorHelper from '../editor-helper'

const Container = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #55a532;
  font-size: 20px;
  box-sizing: border-box;
`

// eslint-disable-next-line react/prefer-stateless-function
class Unexpected extends React.Component {
  render() {
    const { title } = this.props
    const style = EditorHelper.calcStyle(this.props.styleValues)
    console.log('carousel.....', style)

    return <Container style={style}>{title}=》Unexpected</Container>
  }
}

export default Unexpected
