import React from 'react'
import _ from 'lodash'
import EditorHelper from '../editor-helper'
import { Carousel } from 'antd'

const imageUrl =
  'https://xubai-public.oss-cn-beijing.aliyuncs.com/upload%2FMoyi%2FM000001%2F%E6%B5%B7%E6%8A%A5%E5%B1%95%E7%A4%BA4-rc-upload-1540881474825-27.jpeg?x-oss-process=style/normal'

// eslint-disable-next-line react/prefer-stateless-function
class EleCarousel extends React.Component {
  render() {
    const { styleValues = {}, values = {} } = this.props
    const style = EditorHelper.calcStyle({ styleValues })
    const { imageList = [] } = values

    const defaultList = []
    if (imageList.length === 0) {
      defaultList.push({ uid: '11', imageUrl })
    }
    const list = _.concat(imageList, defaultList)
    return (
      <Carousel style={style} autoplay>
        {list.map((it) => (
          <div key={it.uid}>
            <img alt='' style={style} src={it.url || imageUrl} />
          </div>
        ))}
      </Carousel>
    )
  }
}

export default EleCarousel
