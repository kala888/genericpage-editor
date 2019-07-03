import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { connect } from 'dva'

import { Button } from 'antd'
import ElementMenu from '../components/simulator/menu/element-menu'
import SimulatorContainer from '../components/simulator/simulator-container'
import PropsEditor from '../components/simulator/props/props-editor'
import NavigationService from '../nice-router/navigation.service'
import Trash from '../components/simulator/trash'

const Page = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 1000px;
  background-color: #f4f4f4;
`

const Pane = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid gainsboro;
  padding: 10px;
`

const LeftPane = styled(Pane)`
  width: 400px;
`

const RightPane = styled(Pane)`
  width: 600px;
  padding-bottom: 200px;
`

const Content = styled(Pane)`
  flex: 1;
  flex-direction: row;
  alignitems: 'flex-end';
  justify-content: center;
`
// const Content = styled.div`
//   position:absolute;
// `

const ScaleOption = styled.div`
  align-self: center;
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`

@connect(({ simulator }) => ({ ...simulator }))
class SimulatorPage extends React.PureComponent {
  handleScale = (decrease = false) => {
    NavigationService.navigate('simulator/scale', { decrease })
  }

  handleResetScale = () => {
    NavigationService.navigate('simulator/resetScale')
  }

  onDragUpdate = result => {
    console.log('result  onDragUpdate', result)
  }

  onDragEnd = result => {
    const { source, destination, draggableId } = result

    console.log('onDragEnd', result)
    // dropped outside the list
    if (!destination) {
      return
    }

    const dragFrom = source.droppableId
    const dragTo = destination.droppableId
    const payload = {
      source,
      destination,
      id: draggableId,
    }

    if (dragFrom === 'screen' && dragTo === 'trash') {
      NavigationService.dispatch('simulator/removeItem', payload)
      return
    }

    if (dragFrom === dragTo) {
      // 自己排序
      NavigationService.dispatch('simulator/reorderMenuList', payload)
      return
    }

    if (dragFrom === 'menu-items' && dragTo === 'screen') {
      // 从侧栏拖元素到simulator的screen
      NavigationService.dispatch('simulator/dragToScreen', payload)
      return
    }

    // 默认是从一遍移动到另外的一遍
    console.log('This is Bug here')
    // NavigationService.dispatch('simulator/moveInScreen', payload)
  }

  render() {
    const { scaleValues, scaleIndex, elementMenuList, screen } = this.props
    const scale = scaleValues[scaleIndex] / 100

    console.log('1231231', this.props)

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Page>
          <LeftPane>
            <ScaleOption>
              <div size="small">{scaleValues[scaleIndex]}%</div>
              <Button size="small" onClick={() => this.handleScale(false)}>
                放大
              </Button>
              <Button size="small" onClick={() => this.handleScale(true)}>
                缩小
              </Button>
              <Button size="small" onClick={this.handleResetScale}>
                重置大小
              </Button>
            </ScaleOption>
            <ElementMenu menuList={elementMenuList} />
          </LeftPane>

          <Content>
            <SimulatorContainer scale={scale} list={screen} />
            <Trash />
          </Content>

          <RightPane>
            <PropsEditor list={screen} />
          </RightPane>
        </Page>
      </DragDropContext>
    )
  }
}

export default SimulatorPage
