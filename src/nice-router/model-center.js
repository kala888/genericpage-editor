// https://github.com/Meituan-Dianping/mpvue/issues/736 mpvue中不能叫 app 和 config
import _ from 'lodash'
import modelTools from './model-tools'

// 普通的model,也可以通过@modelConnect('home','regisry')来创建和connect
// const modelList = [app,home,'registry', 'article', 'artwork']
const modelList = ['home']
const modlels = modelList.map(it => {
  if (_.isString(it)) {
    return modelTools.createDefault(it)
  }
  return _.merge(modelTools.createDefault(it.namespace), it)
})
console.log('initial modules', modlels)
export default { modlels }
