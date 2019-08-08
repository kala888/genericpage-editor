import React from 'react'
import _ from 'lodash'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { Modal } from 'antd'
import { connect } from 'dva'
import ScreenContainer from '../components/simulator/screen-container'
import PropsEditor from '../components/simulator/props-editor'
import NavigationService from '../nice-router/navigation.service'
import PageOption from '../components/simulator/page-option'
import MenuPane from '../components/simulator/menu/menu-pane'
import Config from '../utils/config'

const Container = styled.div`
  width: 100%;
`

const Project = styled.div`
  font-size: 30px;
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-self: center;
  padding: 10px 30px;
  color: deepskyblue;
`

const Page = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 1000px;
  padding: 10px 80px 40px 80px;
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
  align-items: 'flex-end';
  justify-content: center;
  border-left: 2px solid #eee;
  border-right: 2px solid #eee;
`

const Left = styled(Pane)`
  width: 450px;
`

@connect(({ editor, page }) => ({ ...editor, page }))
class SimulatorPage extends React.PureComponent {
  componentDidMount() {
    console.log(Config.api.FooterHome)
    NavigationService.view(Config.api.FooterHome)
  }

  handleScale = (decrease = false) => {
    NavigationService.dispatch('editor/scale', { decrease })
  }

  handleResetScale = () => {
    NavigationService.dispatch('editor/resetScale')
  }

  onDragUpdate = result => {
    console.log('result  onDragUpdate', result)
  }

  onDragEnd = result => {
    const { source, destination, draggableId } = result

    if (_.isEmpty(this.props.page)) {
      Modal.info({ content: '请选择或者创建一个页面' })
      return
    }

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
      NavigationService.dispatch('editor/removeItem', payload)
      return
    }

    if (dragFrom === dragTo) {
      // 自己排序
      NavigationService.dispatch('editor/reorderMenuList', payload)
      return
    }

    if (dragFrom.indexOf('menu-items') > -1 && dragTo === 'screen') {
      // 从侧栏拖元素到screen
      NavigationService.dispatch('editor/dragToScreen', payload)
      return
    }

    // 默认是从一遍移动到另外的一遍
    console.log('This is Bug here')
    // NavigationService.dispatch('simulator/moveInScreen', payload)
  }

  render() {
    const { scaleValues, scaleIndex, screen, menuGroups, page = {} } = this.props
    const { pageList, displayName, id } = this.props
    const scaleValue = scaleValues[scaleIndex]
    const scale = scaleValue / 100

    console.log('render editor page', this.props)
    return (
      <Container>
        <Project>{displayName}</Project>

        <DragDropContext onDragEnd={this.onDragEnd}>
          <Page>
            <Left>
              <MenuPane
                projectId={id}
                scaleValue={scaleValue}
                menuGroups={menuGroups}
                pageList={pageList}
              />
            </Left>
            <Body>
              <ScreenContainer scale={scale} list={screen} title={page.title} />
              <PageOption page={page} />
            </Body>
            <Right>
              <PropsEditor list={screen} />
            </Right>
          </Page>
        </DragDropContext>
      </Container>
    )
  }
}

export default SimulatorPage
