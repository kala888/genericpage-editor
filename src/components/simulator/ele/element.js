import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'

import EleCarousel from './ele-carousel'
import NavigationService from '../../../nice-router/navigation.service'

const BaseWrapper = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #55a532;
  font-size: 40px;
  box-sizing: border-box;
`
const OtherWrapper = styled(BaseWrapper)`
  height: 200px;
  padding: 10px;
  background-color: firebrick;
  border-radius: 10px;
`

function StoreLocation({ title }) {
  return <BaseWrapper>{title}</BaseWrapper>
}

function Others(item) {
  return (
    <OtherWrapper>
      {item.title}
      <div style={{ fontSize: '20px', wordBreak: 'break-all' }}> {JSON.stringify(item)}</div>
    </OtherWrapper>
  )
}

const RegistryElements = ['store-location', 'carousel']

function getComponentType(componentType) {
  return _.findIndex(RegistryElements, it => it === componentType) > -1 ? componentType : 'others'
}

class Element extends React.PureComponent {
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

  render() {
    const { componentType } = this.props
    const type = getComponentType(componentType)
    console.log('render Element', this.props)

    return (
      <React.Fragment>
        {type === 'store-location' && <StoreLocation {...this.props} />}
        {type === 'carousel' && <EleCarousel {...this.props} />}
        {type === 'others' && (
          <div style={{ margin: '10px' }}>
            <Others {...this.props} />
          </div>
        )}
      </React.Fragment>
    )
  }
}

export default Element
