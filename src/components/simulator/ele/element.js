import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'

import EleCarousel from './ele-carousel'
import NavigationService from '../../../nice-router/navigation.service'

const Container = styled.div`
  width: 100%;
`

const Unexcepted = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #55a532;
  font-size: 40px;
  box-sizing: border-box;
`
const RegistryElements = ['carousel']

function getComponentType(componentType) {
  return _.findIndex(RegistryElements, it => it === componentType) > -1 ? componentType : 'others'
}

class Element extends React.Component {
  handleClick = () => {
    console.log('Element Click', this.props)
    // 点击的时候，切换右侧"属性编辑器"
    NavigationService.dispatch('element/clickToEdit', this.props.item)
  }

  render() {
    const { componentType, values = {} } = this.props
    const type = getComponentType(componentType)
    console.log('render Element', this.props)
    const { marginVertical = 0, marginHorizontal = 0 } = values
    return (
      <Container style={{ margin: `${marginVertical}px ${marginHorizontal}px` }}>
        {type === 'carousel' && <EleCarousel {...this.props} />}
        {type === 'others' && <Unexcepted>{this.props.title}</Unexcepted>}
      </Container>
    )
  }
}

export default Element
