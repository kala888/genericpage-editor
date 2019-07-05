import React from 'react'
import styled from 'styled-components'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import MenuItem from './menu-item'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-bottom: 20px;
`

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 83px;
  width: 83px;
  margin-right: -1px;
  margin-bottom: -1px;
  line-height: 1.5;
  background: #fff;
  border: 1px ${props => (props.isDragging ? 'dashed #000' : 'solid #ddd')};

  &:hover {
    box-shadow: 0 0 5px deepskyblue;
    transition: box-shadow 0.5s;
    z-index: 9999;
  }
`

const Clone = styled(Item)`
  ~ div {
    transform: none !important;
  }
`

export default class GroupedMenu extends React.PureComponent {
  render() {
    const { list = [], groupId = 'menu-items' } = this.props
    return (
      <Droppable droppableId={groupId} isDropDisabled>
        {(provided, snapshot) => (
          <Container ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
            {list.map((item, index) => (
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
                      <MenuItem {...item} />
                    </Item>
                    {// 拖动的时候，复制一份，覆盖到原来的位置占坑
                    draggableSnapshot.isDragging && (
                      <Clone>
                        <MenuItem {...item} />
                      </Clone>
                    )}
                  </React.Fragment>
                )}
              </Draggable>
            ))}
            <div style={{ display: 'none' }}>{provided.placeholder}</div>
          </Container>
        )}
      </Droppable>
    )
  }
}
