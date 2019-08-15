import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'

import EleCarousel from './ele-carousel'
import NavigationService from '../../../nice-router/navigation.service'
import Unexpected from './unexpected'

const Container = styled.div`
  width: 100%;
`

const RegistryElements = ['carousel']

function getComponentType(componentType) {
  return _.findIndex(RegistryElements, (it) => it === componentType) > -1 ? componentType : 'others'
}

class Element extends React.Component {
  handleClick = () => {
    console.log('Element Click', this.props)
    // 点击的时候，切换右侧"属性编辑器"
    NavigationService.dispatch('element/clickToEdit', this.props.item)
  }

  render() {
    const { componentType } = this.props
    const type = getComponentType(componentType)
    console.log('render Element', this.props)
    return (
      <Container>
        {type === 'carousel' && <EleCarousel {...this.props} />}
        {type === 'others' && <Unexpected {...this.props} />}
      </Container>
    )
  }
}

export default Element
