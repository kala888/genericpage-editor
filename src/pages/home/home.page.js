import React, { PureComponent } from 'react'
import Link from 'umi/link'
import router from 'umi/router'

import { modelConnect } from '../../nice-router/model-tools'
import NavigationService from '../../nice-router/navigation.service'
import Config from '../../utils/config'

// eslint-disable-next-line react/prefer-stateless-function
@modelConnect('home')
class HomePage extends PureComponent {
  componentDidMount() {
    NavigationService.ajax(Config.api.FooterHome)
  }

  render() {
    console.log('render....')
    return (
      <div className="column center" style={{ height: '100%' }}>
        <Link to="/me">我的</Link>
        <div
          onClick={() => {
            router.push('/ours')
          }}
        >
          大家的
        </div>
        <div>
          {JSON.stringify(this.props)}
        </div>
      </div>
    )
  }
}

export default HomePage
