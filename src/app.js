import _ from 'lodash'
import ModelCenter from './nice-router/model-center'
import Config from './utils/config'
import NiceRouter from './nice-router/nice-router'

NiceRouter.start({ config: Config })

export function render(oldRender) {
  _.each(ModelCenter.modlels, it => {
    window.g_app.model(it)
  })
  oldRender()
}

export default {
  config: {
    onError(e) {
      e.preventDefault()
      // console.error(e.message);
    },
  },
  // plugins: [require('dva-logger')()],
}
