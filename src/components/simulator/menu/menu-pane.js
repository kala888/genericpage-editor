import React from 'react'
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

class MenuPane extends React.PureComponent {
  render() {
    const { scaleValue, menuGroups } = this.props
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

        <Tabs defaultActiveKey="pages" type="card">
          <TabPane tab="页面" key="pages">
            <PageContent>
              <NewPagePopup />
              <MenuPageItem page={{ title: '页面页面页面页面1' }} />
              <MenuPageItem page={{ title: '页面2' }} />
              <MenuPageItem page={{ title: '页面3' }} />
              <MenuPageItem page={{ title: '页面4' }} />
            </PageContent>
          </TabPane>
          <TabPane tab="页面编辑器" key="editor">
            <Content>
              <Collapse defaultActiveKey={activePaneList} expandIconPosition="right">
                {menuGroups.map(it => (
                  <Panel key={it.groupId} header={it.title}>
                    <GroupedMenu groupId={it.groupId} title={it.title} list={it.list} />
                  </Panel>
                ))}
              </Collapse>
            </Content>
          </TabPane>
        </Tabs>
      </Container>
    )
  }
}

export default MenuPane
