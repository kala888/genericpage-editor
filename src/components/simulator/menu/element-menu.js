import React from 'react'
import styled from 'styled-components'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import ElementMenuItem from './element-menu-item'

const List = styled.div`
  border: 1px ${props => (props.isDraggingOver ? 'dashed #000' : 'solid #ddd')};
  background: #fff;
  padding: 0.5rem 0.5rem 0;
  border-radius: 3px;
  flex: 0 0 150px;
  font-family: sans-serif;
`

const Container = styled(List)`
  //position: absolute;
  //top: 0;
  //right: 0;
  //bottom: 0;
  width: 200px;
`

const Item = styled.div`
  display: flex;
  user-select: none;
  padding: 0.5rem;
  margin: 0 0 0.5rem 0;
  align-items: flex-start;
  align-content: flex-start;
  line-height: 1.5;
  border-radius: 3px;
  background: #fff;
  border: 1px ${props => (props.isDragging ? 'dashed #000' : 'solid #ddd')};
`

const Clone = styled(Item)`
  ~ div {
    transform: none !important;
  }
`

export default class ElementMenu extends React.PureComponent {
  render() {
    const { menuList = [] } = this.props
    return (
      <Droppable droppableId="menu-items" isDropDisabled>
        {(provided, snapshot) => (
          <Container ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
            {menuList.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(draggableProvided, draggableSnapshot) => (
                  <React.Fragment>
                    <Item
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      isDragging={draggableSnapshot.isDragging}
                      style={draggableProvided.draggableProps.style}
                    >
                      <ElementMenuItem {...item} />
                    </Item>
                    {// 拖动的时候，复制一份，覆盖到原来的位置
                    draggableSnapshot.isDragging && (
                      <Clone>
                        {' '}
                        <ElementMenuItem {...item} />
                      </Clone>
                    )}
                  </React.Fragment>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    )
  }
}
