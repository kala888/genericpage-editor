import React from 'react'
import styled from 'styled-components'

import { Droppable } from 'react-beautiful-dnd'
import DraggableElement from './ele/draggable-element'

const simulatorBg = require('../../assets/images/iphone7-wechat-simulator.png')
const wechatHeaderImg = require('../../assets/images/wechat-header.png')

const Container = styled.div`
     width: 435px;
     height: 888px;
     background-image: url(${simulatorBg});
     background-size: cover;
     //transform: ${({ scaleTo }) => `scale(${scaleTo})`};
     //有transform地时候，拖拽会有问题
`

const WechatScreen = styled.div`
  margin-top: 114px;
  width: 375px;
  min-width: 375px;
  margin-left: 30px;
  height: 667px;
  //transform: matrix(1, 0, 0, 1, 0, 0);
  background-color: #f4f4f4;
  z-index: 9999;
`

const WechatScreenHeader = styled.div`
  position: relative;
  height: 70px;
`
const ScreenHeaderText = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-size: 20px;
  font-weight: 500;
  padding-bottom: 13px;
`

const WechatScreenBody = styled.div`
  height: 597px;
  min-height: 597px;
  background-color: #fff;
  overflow: auto;
`

class ScreenContainer extends React.PureComponent {
  render() {
    const { scale, list = [], title } = this.props

    console.log('render,list', list)

    return (
      <Container scaleTo={scale}>
        <WechatScreen>
          <WechatScreenHeader>
            <img alt='wechat-header' style={{ width: '100%' }} src={wechatHeaderImg} />
            <ScreenHeaderText>{title}</ScreenHeaderText>
          </WechatScreenHeader>
          <Droppable droppableId='screen'>
            {(provided, snapshot) => (
              <WechatScreenBody ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
                {list.map((item, index) => (
                  <DraggableElement key={item.id} index={index} item={item} />
                ))}
                {provided.placeholder}
              </WechatScreenBody>
            )}
          </Droppable>
        </WechatScreen>
      </Container>
    )
  }
}

export default ScreenContainer
