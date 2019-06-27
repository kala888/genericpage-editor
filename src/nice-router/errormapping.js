import _ from 'lodash'

const mapping = {
  'com.bbt.networkException': {
    message: '网络异常',
  },
}

export default function routemap(errorKey) {
  const result = _.get(mapping, errorKey, {})
  return result
}
