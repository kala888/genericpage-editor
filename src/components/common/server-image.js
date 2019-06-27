/**
 * Created by kalaliu on 2017/8/25.
 */
import React from 'react'

import {
  loadTinyImg,
  loadSmallImg,
  loadMiddleImg,
  loadNormalImg,
  loadLargeImg,
  loadXLargeImg,
  loadOriginImg,
  loadServerImage,
  loadWaterfallImg,
} from '../../utils/image-tools'

export default class ServerImage extends React.PureComponent {
  render() {
    const { uri = '', size = 'normal', ...others } = this.props
    if (uri.length === 0) {
      return null
    }
    // uri="https://xubai-public.oss-cn-beijing.aliyuncs.com/upload/MoyiUser/MU101354/2018/1026/072552_9293183.4288x2848.jpg"

    let url = uri
    switch (size) {
      case 'tiny':
        url = loadTinyImg(uri)
        break
      case 'small':
        url = loadSmallImg(uri)
        break
      case 'middle':
        url = loadMiddleImg(uri)
        break
      case 'normal':
        url = loadNormalImg(uri)
        break
      case 'large':
        url = loadLargeImg(uri)
        break
      case 'xlarge':
        url = loadXLargeImg(uri)
        break
      case 'origin':
        url = loadOriginImg(uri)
        break
      case 'waterfall':
        url = loadWaterfallImg(uri)
        break
      default:
        url = loadServerImage(uri)
    }

    return <img alt="doublechain" {...others} src={url} />
  }
}
