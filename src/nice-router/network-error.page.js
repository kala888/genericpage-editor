import React from 'react'
import NavigationService from './navigation.service'

const networkImage = require('../assets/images/network.png')

export default class NetworkErrorPage extends React.PureComponent {
  onRefresh = () => {
    NavigationService.dispatch('niceRouter/retry')
  }

  render() {
    return (
      <div>
        <img alt='' src={networkImage} />
        点我刷新
      </div>
    )
  }
}
