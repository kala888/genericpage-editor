import React, { PureComponent } from 'react'
import styles from './styles.less'

// eslint-disable-next-line react/prefer-stateless-function
class OursPage extends PureComponent {
  render() {
    console.log('render....')
    return <div className={styles.our}>大家的</div>
  }
}

export default OursPage
