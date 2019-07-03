import React from 'react'
import { Icon } from 'antd'
import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'

const Container = styled.div`
  border: 2px solid ${({ isDraggingOver }) => (isDraggingOver ? 'red' : '#fff')};
  margin-left: 50px;
  margin-top: 200px;
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`

class Trash extends React.PureComponent {
  render() {
    return (
      <Droppable droppableId="trash">
        {(provided, snapshot) => (
          <Container ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
            <Icon type="delete" style={{ fontSize: '50px' }} />
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    )
  }
}

export default Trash
