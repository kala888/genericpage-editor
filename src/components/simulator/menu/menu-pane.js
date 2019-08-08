import React from 'react'
import { connect } from 'dva'
import styled from 'styled-components'
import { Button, Collapse, Tabs } from 'antd'
import GroupedMenu from './grouped-menu'
import NewPagePopup from './new-page-popup'
import MenuPageItem from './menu-page-item'

const Container = styled.div`
  border: 1px solid gainsboro;
  padding: 10px 30px;
  //width: 100%;
  width: 360px;
`

const ScaleOption = styled.div`
  align-self: center;
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`

const Content = styled.div`
  height: 800px;
  overflow: auto;
`
const PageContent = styled(Content)`
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 0px 5px;
`

const { TabPane } = Tabs
const { Panel } = Collapse

@connect(({ page }) => ({ ...page }))
class MenuPane extends React.PureComponent {
  state = {
    activeKey: 'pages',
  }

  handleTabClick = tab => {
    console.log('asdfasdfasdf', tab)
    this.setState({ activeKey: tab })
  }

  switch2Editor = () => this.setState({ activeKey: 'editor' })

  render() {
    const { scaleValue, menuGroups = [], pageList = [] } = this.props

    const { projectId, id } = this.props
    const activePaneList = menuGroups.map(it => it.groupId)
    console.log('activePaneList', activePaneList)
    return (
      <Container>
        <ScaleOption>
          <div size="small">{`${scaleValue}%`}</div>
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

        <Tabs type="card" activeKey={this.state.activeKey} onTabClick={this.handleTabClick}>
          <TabPane tab="页面" key="pages">
            <PageContent>
              <NewPagePopup projectId={projectId} />
              {pageList.map(it => (
                <MenuPageItem
                  key={it.id}
                  isEditing={it.id === id}
                  projectId={projectId}
                  page={it}
                  onItemDoubleClick={this.switch2Editor}
                />
              ))}
            </PageContent>
          </TabPane>
          <TabPane tab="页面编辑器" key="editor">
            <Content>
              <Collapse defaultActiveKey={activePaneList} expandIconPosition="right">
                {menuGroups.map(it => {
                  const { title, groupId, list } = it
                  return (
                    <Panel key={groupId} header={title}>
                      <GroupedMenu groupId={groupId} title={title} list={list} />
                    </Panel>
                  )
                })}
              </Collapse>
            </Content>
          </TabPane>
        </Tabs>
      </Container>
    )
  }
}

export default MenuPane
