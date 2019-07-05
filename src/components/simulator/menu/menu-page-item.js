import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'

const Container = styled.div`
  padding: 5px 5px 5px 15px;
  width: 100%;
  margin-top: 3px;
  display: flex;
  flex: 1;
  &:hover {
    box-shadow: 0 0 4px deepskyblue;
    transition: box-shadow 0.5s;
    .option {
      display: flex;
    }
  }
`
const Title = styled.div`
  display: flex;
  flex: 1;
  align-self: center;
`
const Options = styled.div`
  display: none;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100px;
`

class MenuPageItem extends React.PureComponent {
  handleEditPage = e => {
    console.log(e)
  }

  handleCopyPage = e => {
    console.log(e)
  }

  showQRCode = e => {
    console.log(e)
  }

  removePage = e => {
    console.log(e)
  }

  render() {
    const { page: { title } = {} } = this.props

    return (
      <Container onClick={this.handleEditPage}>
        <Title>{title}</Title>
        <Options className="option">
          <Button size="small" shape="circle" icon="copy" onClick={this.handleCopyPage} />
          <Button size="small" shape="circle" icon="qrcode" onClick={this.showQRCode} />
          <Button size="small" shape="circle" icon="delete" onClick={this.removePage} />
        </Options>
      </Container>
    )
  }
}

export default MenuPageItem
