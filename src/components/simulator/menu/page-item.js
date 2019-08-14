import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import _ from 'lodash'
import NavigationService from '../../../nice-router/navigation.service'
import Config from '../../../utils/config'

const Container = styled.div`
  padding: 5px 5px 5px 15px;
  width: 100%;
  margin-top: 3px;
  display: flex;
  flex: 1;
  box-shadow: ${({ isEditing }) => (isEditing ? '0 0 4px deepskyblue' : 'inherit')};
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
  width: 120px;
`

class PageItem extends React.PureComponent {
  openEditPagePopup = () => {
    NavigationService.view('editor/editPage', {})
  }

  handleCopyPage = () => {
    const { page: { id, project = {} } = {} } = this.props
    NavigationService.ajax(Config.api.CopyPage, {
      projectId: project.id,
      pageId: id,
    })
  }

  showQRCode = (e) => {
    console.log(e)
  }

  removePage = () => {
    const { page: { id, project = {} } = {} } = this.props
    NavigationService.post(Config.api.RemovePage, {
      projectId: project.id,
      pageIds: id,
    })
  }

  handleClick = (e) => {
    if (!this.delayedClick) {
      this.delayedClick = _.debounce(this.doClick, 500)
    }
    if (this.clickedOnce) {
      this.delayedClick.cancel()
      this.clickedOnce = false
      console.log('double click')
      const { onItemDoubleClick } = this.props
      NavigationService.ajax(
        Config.api.ViewPage,
        { id: this.props.page.id },
        {
          onSuccess: () => {
            if (onItemDoubleClick) {
              onItemDoubleClick()
            }
          },
        }
      )
    } else {
      this.delayedClick(e)
      this.clickedOnce = true
    }
  }

  doClick = () => {
    this.clickedOnce = undefined
    NavigationService.ajax(Config.api.ViewPage, { id: this.props.page.id })
  }

  render() {
    const { page: { title } = {}, isEditing = false } = this.props

    return (
      <Container onClick={this.handleClick} isEditing={isEditing}>
        <Title>{title}</Title>
        <Options className='option'>
          <Button size='small' shape='circle' icon='setting' onClick={this.openEditPagePopup} />
          <Button size='small' shape='circle' icon='copy' onClick={this.handleCopyPage} />
          <Button size='small' shape='circle' icon='qrcode' onClick={this.showQRCode} />
          <Button size='small' shape='circle' icon='delete' onClick={this.removePage} />
        </Options>
      </Container>
    )
  }
}

export default PageItem
