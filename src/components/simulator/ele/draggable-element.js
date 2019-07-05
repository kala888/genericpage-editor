import React from 'react'
import styled from 'styled-components'
import { Icon, Modal } from 'antd'
import { connect } from 'dva'
import { Draggable } from 'react-beautiful-dnd'
import NavigationService from '../../../nice-router/navigation.service'
import Element from './element'

const { confirm } = Modal

const Container = styled.div`
  width: 100%;
  display: flex;
  user-select: none;
  position: relative;
  padding: ${({ isDragging }) => (isDragging ? '0.05rem' : 0)};
  border: ${({ isDragging, isEditing, dashedEditing }) => {
    if (isDragging) {
      return '1px dashed #000'
    }
    if (isEditing && dashedEditing) {
      return '2px dashed deepskyblue'
    }
    return 'inherit'
  }};
`

const Options = styled.div`
  position: absolute;
  top: 5px;
  right: 10px;
  display: ${({ isEditing }) => (isEditing ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`

const OptionAction = styled.div`
  padding: 2px 8px;
  font-size: 12px;
  border: 1px dashed deepskyblue;
`

/**
 * 这些element 会展示在中间的模拟器上，
 * 可以上下拖拽
 *
 * this.props.item 由拖拽产生的传递过来的信息
 * this.props.element dva store 产生的数据
 */
@connect(({ element }) => ({ element }))
class DraggableElement extends React.PureComponent {
  //
  // shouldComponentUpdate(nextProps) {
  //   const { item = {} } = this.props
  //
  //   if (item.id !== nextProps.element.id) {
  //     return true
  //   }
  //   return false
  // }

  handleClick = () => {
    console.log('Element-Click', this.props)
    // 点击的时候，切换右侧"属性编辑器"
    NavigationService.dispatch('element/clickToEdit', this.props.item)
  }

  handleRemove = e => {
    if (e.stopPropagation) {
      e.stopPropagation()
    }
    console.log('Element-Click to remove', this.props)

    const { item } = this.props

    confirm({
      title: '组件删除提示',
      content: '是否确定要从页面删除这个组件？',
      onOk() {
        NavigationService.dispatch('simulator/removeItem', item)
      },
    })
  }

  render() {
    const { item = {}, index, element = {} } = this.props
    const { id } = item
    const { editingId, dashedEditing } = element

    const ele = element[id] || item

    console.log('render darggable-ele', ele)
    const isEditing = editingId === id
    return (
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            style={provided.draggableProps.style}
            isEditing={isEditing}
            onClick={this.handleClick}
            dashedEditing={dashedEditing}
          >
            <Element {...ele} />
            <Options isEditing={isEditing}>
              <OptionAction onClick={this.handleRemove}>删除</OptionAction>
              <Icon style={{ marginLeft: '5px' }} type="setting" spin />
            </Options>
          </Container>
        )}
      </Draggable>
    )
  }
}

export default DraggableElement
