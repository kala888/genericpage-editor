/**
 * Created by kalaliu on 2017/8/25.
 */
import React from 'react'

import {
  loadLargeImg,
  loadMiddleImg,
  loadNormalImg,
  loadOriginImg,
  loadServerImage,
  loadSmallImg,
  loadTinyImg,
  loadWaterfallImg,
  loadXLargeImg,
} from '../../utils/image-tools'

export default class ServerImage extends React.PureComponent {
  render() {
    const { uri, src, size = 'normal', ...others } = this.props

    let url = uri || src || ''
    console.log('iiiiiii', url)

    if (url.length === 0) {
      return null
    }
    // uri="https://xubai-public.oss-cn-beijing.aliyuncs.com/upload/MoyiUser/MU101354/2018/1026/072552_9293183.4288x2848.jpg"

    switch (size) {
      case 'tiny':
        url = loadTinyImg(url)
        break
      case 'small':
        url = loadSmallImg(url)
        break
      case 'middle':
        url = loadMiddleImg(url)
        break
      case 'normal':
        url = loadNormalImg(url)
        break
      case 'large':
        url = loadLargeImg(url)
        break
      case 'xlarge':
        url = loadXLargeImg(url)
        break
      case 'origin':
        url = loadOriginImg(url)
        break
      case 'waterfall':
        url = loadWaterfallImg(url)
        break
      default:
        url = loadServerImage(url)
    }

    return <img alt='doublechain' {...others} src={url} />
  }
}
