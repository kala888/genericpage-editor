import _ from 'lodash'
import config from './config'

// const logo = require('./images/default_id_icon.png')

function loadServerImage(uri, style) {
  if (!uri) {
    console.warn('image uri could not be', uri)
    return uri
  }
  let url = uri || ''
  if (uri && !uri.startsWith('https://')) {
    if (uri.indexOf('images') === -1) {
      url = `${config.oss.staticURL}images/${uri}`
    } else {
      url = `${config.oss.staticUR}${uri}`
    }
  }
  if (url.indexOf('x-oss-process') > -1) {
    return url
  }
  return `${url}${style}`
}

const curriedLoadImgWithStyle = _.curryRight(loadServerImage)

const loadTinyImg = curriedLoadImgWithStyle('?x-oss-process=style/tiny')
const loadSmallImg = curriedLoadImgWithStyle('?x-oss-process=style/small')
const loadMiddleImg = curriedLoadImgWithStyle('?x-oss-process=style/middle')
const loadNormalImg = curriedLoadImgWithStyle('?x-oss-process=style/normal')
const loadLargeImg = curriedLoadImgWithStyle('?x-oss-process=style/large')
const loadXLargeImg = curriedLoadImgWithStyle('?x-oss-process=style/xlarge')
const loadOriginImg = curriedLoadImgWithStyle('?x-oss-process=style/origin')
const loadWaterfallImg = curriedLoadImgWithStyle('?x-oss-process=style/waterfall')

export {
  loadTinyImg,
  loadSmallImg,
  loadMiddleImg,
  loadNormalImg,
  loadLargeImg,
  loadXLargeImg,
  loadOriginImg,
  loadServerImage,
  loadWaterfallImg,
}
