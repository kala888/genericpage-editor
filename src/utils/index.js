import _ from 'lodash'
import moment from 'moment-mini'
import numeral from 'numeral'
import NiceRouter from '../nice-router/nice-router'

function showFormError(error) {
  console.log('error is', error)
  if (!error) {
    return false
  }

  if (_.isString(error)) {
    NiceRouter.sad(error)
    return true
  }

  if (_.isArray(error)) {
    if (_.isString(error[0])) {
      NiceRouter.sad(error[0])
      return true
    }
    NiceRouter.sad(_.values(error)[0].errors[0].message)
    return true
  }
  return false
}

function formatTime(value) {
  if (!value) {
    return ''
  }
  return moment(value).format('YYYY-MM-DD HH:mm')
}

function enrichListOfEntity({ dataContainer, targetList = [], root = {} }, ...names) {
  let refsEntityContainer = dataContainer
  if (!refsEntityContainer) {
    refsEntityContainer = root.dataContainer
  }
  if (!refsEntityContainer || (_.isEmpty(refsEntityContainer) && !_.isEmpty(targetList))) {
    console.log('data container is empty, and target is not empty, return itself')
    return targetList
  }
  const doEnrichment = (list) => list.map((ref) => refsEntityContainer[ref.id]).filter((it) => it)
  if (names.length === 0) {
    return targetList ? doEnrichment(targetList) : []
  }
  const tempObj = {}
  _.forEach(names, (it) => {
    const list = root[it] || []
    if (list.length > 0) {
      tempObj[it] = doEnrichment(list)
    }
  })
  return tempObj
}

function formatRaito(pRatio) {
  const ratio = (pRatio * 100).toFixed(3)
  const result = _.trimEnd(_.trimEnd(ratio, '0'), '.')
  return `${result}%`
}

function formatMoney(money) {
  const result = _.trimEnd(_.trimEnd(money.toFixed(2), '0'), '.')
  console.log(result)
  return result
}

function calcDuration(duration) {
  if (!duration) {
    return '0天0时0分'
  }
  const days = _.round(duration.asDays())
  const hours = duration.hours()
  const minutes = duration.minutes()
  const seconds = duration.seconds()
  return `${days}天${hours}时${minutes}分${seconds}`
}

function formatBigNumber(number) {
  return _.toUpper(numeral(number).format('0a'))
}

export { showFormError, formatTime, enrichListOfEntity, formatRaito, calcDuration, formatBigNumber, formatMoney }
