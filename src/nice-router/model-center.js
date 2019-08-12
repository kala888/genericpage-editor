import _ from 'lodash'
import modelTools from './model-tools'
import niceRouterModel from './nicer-router.model'
import elementModel from '../components/simulator/element.model'
import editor from '../components/simulator/editor.model'

// 普通的model,也可以通过@modelConnect('home','user')来创建和connect
// const modelList = [app,home,'registry', 'article', 'artwork']

const modelList = [niceRouterModel, 'home', elementModel, editor]
const models = modelList.map(it => {
  if (_.isString(it)) {
    return modelTools.createDefault(it)
  }
  return _.merge(modelTools.createDefault(it.namespace), it)
})
console.log('initial modules', models)
export default { models }
