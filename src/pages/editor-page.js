import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { connect } from 'dva'
import SimulatorContainer from '../components/simulator/simulator-container'
import PropsEditor from '../components/simulator/props-editor'
import NavigationService from '../nice-router/navigation.service'
import PageOption from '../components/simulator/page-option'
import MenuPane from '../components/simulator/menu/menu-pane'
import Config from '../utils/config'

const Page = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 1000px;
  padding: 40px 80px;
  background-color: #fff;
`

const Pane = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #fbfbfb;
`

const Right = styled(Pane)`
  width: 600px;
  padding-bottom: 200px;
`

const Body = styled(Pane)`
  flex: 1;
  flex-direction: row;
  alignitems: 'flex-end';
  justify-content: center;
  border-left: 2px solid #eee;
  border-right: 2px solid #eee;
`
const Left = styled(Pane)`
  width: 450px;
`

@connect(({ simulator }) => ({ ...simulator }))
class SimulatorPage extends React.PureComponent {
  componentDidMount() {
    console.log(Config.api.FooterHome)
    // NavigationService.ajax(Config.api.FooterHome)
  }

  handleScale = (decrease = false) => {
    NavigationService.dispatch('simulator/scale', { decrease })
  }

  handleResetScale = () => {
    NavigationService.dispatch('simulator/resetScale')
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

    if (dragFrom.indexOf('menu-items') > -1 && dragTo === 'screen') {
      // 从侧栏拖元素到simulator的screen
      NavigationService.dispatch('simulator/dragToScreen', payload)
      return
    }

    // 默认是从一遍移动到另外的一遍
    console.log('This is Bug here')
    // NavigationService.dispatch('simulator/moveInScreen', payload)
  }

  render() {
    const { scaleValues, scaleIndex, menuGroups, screen } = this.props
    const scaleValue = scaleValues[scaleIndex]
    const scale = scaleValue / 100
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Page>
          <Left>
            <MenuPane scaleValue={scaleValue} menuGroups={menuGroups} />
          </Left>
          <Body>
            <SimulatorContainer scale={scale} list={screen} />
            <PageOption />
          </Body>
          <Right>
            <PropsEditor list={screen} />
          </Right>
        </Page>
      </DragDropContext>
    )
  }
}

export default SimulatorPage
