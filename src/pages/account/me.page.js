import React, { PureComponent } from 'react'
import styles from './styles.less'

// eslint-disable-next-line react/prefer-stateless-function
class MePage extends PureComponent {
  render() {
    console.log('render....')
    return <div className={styles.me}>这里是我的页面</div>
  }
}

export default MePage
