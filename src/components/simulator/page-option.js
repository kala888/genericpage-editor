import React from 'react'
import { Button, Icon, Modal } from 'antd'
import { Droppable } from 'react-beautiful-dnd'
import { connect } from 'dva'
import styled from 'styled-components'
import NavigationService from '../../nice-router/navigation.service'

const { confirm } = Modal

const Container = styled.div`
  margin-top: 100px;
  width: 150px;
  height: 667px;
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Item = styled.div`
  margin-top: 10px;
  width: 100%;
`

const Trash = styled.div`
  border: 2px solid deepskyblue;
  width: 150px;
  padding: 10px;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${({ isDraggingOver }) => (isDraggingOver ? 'red' : 'inherit')};
  height: 150px;
`

@connect(({ element }) => ({ element }))
class PageOption extends React.PureComponent {
  handleDashedEditing = () => {
    NavigationService.dispatch('element/dashedEditing')
  }

  handleClearPage = () => {
    confirm({
      title: '组件清空提示',
      content: '清空本页面的所有元素。。。对的，你没看错，是所有元素？',
      okText: '我确认，已慎重考虑过了',
      okType: 'danger',
      onOk() {
        NavigationService.dispatch('simulator/clearPage')
      },
    })
  }

  render() {
    const { element = {} } = this.props
    const { dashedEditing } = element

    console.log('')

    const dashedEditingStyle = dashedEditing ? { border: '2px dashed deepskyblue' } : {}

    return (
      <Container>
        <Item>
          <Button style={dashedEditingStyle} block onClick={this.handleDashedEditing}>
            虚框展示
          </Button>
        </Item>

        <Item>
          <Button block onClick={this.handleClearPage}>
            清空页面元素
          </Button>
        </Item>

        <Droppable droppableId="trash">
          {(provided, snapshot) => (
            <Trash ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
              <Icon type="delete" style={{ fontSize: '50px' }} />
              {provided.placeholder}
            </Trash>
          )}
        </Droppable>
      </Container>
    )
  }
}

export default PageOption
