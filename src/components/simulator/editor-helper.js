import _ from 'lodash'
import uuid from 'uuid/v4'
import NavigationService from '../../nice-router/navigation.service'

function getPropertyFormName({ name, componentId, id }) {
  return `${name}:${id}:${componentId}`
}

function getPropertyName(str) {
  return str.substr(0, str.indexOf(':'))
}

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}
/**
 * Moves an item from one list to another list.
 */
const copy = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const item = { ...sourceClone[droppableSource.index], id: uuid() }

  destClone.splice(droppableDestination.index, 0, item)
  return { list: destClone, item }
}

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destClone.splice(droppableDestination.index, 0, removed)

  const result = {}
  result[droppableSource.droppableId] = sourceClone
  result[droppableDestination.droppableId] = destClone

  return result
}

function calcStyle(values = {}, customStyle = {}) {
  const {
    marginTop = 0,
    marginRight = 0,
    marginBottom = 0,
    marginLeft = 0,

    paddingTop = 0,
    paddingRight = 0,
    paddingBottom = 0,
    paddingLeft = 0,

    opacity = 100,
    height = 'auto',
    width = '100%',
    backgroundColor = 'transparent',
    borderRadius = 0,
    border = {},
  } = values

  const margin = `${withPx(marginTop)} ${withPx(marginRight)} ${withPx(marginBottom)} ${withPx(marginLeft)}`
  const padding = `${withPx(paddingTop)} ${withPx(paddingRight)} ${withPx(paddingBottom)} ${withPx(paddingLeft)}`

  const borderStyle = _.omit(border, ['extra'])
  console.log('borderStyle', borderStyle)
  const style = {
    margin,
    padding,
    opacity: opacity / 100,
    height: withPx(height),
    width: withPx(width),
    backgroundColor,
    borderRadius: withPx(borderRadius),
    ...borderStyle,
    ...customStyle,
  }
  console.log('style for item', style)
  return style
}

function withPx(value) {
  const result = _.toNumber(value)
  return _.isNaN(result) ? value : `${result}px`
}

const updateStyle = _.throttle(
  ({ name, componentId, value }) => {
    NavigationService.dispatch('element/saveValue', {
      id: componentId,
      styleValues: {
        [name]: value,
      },
    })
  },
  100,
  { trailing: false }
)

const updateValues = _.throttle(
  ({ name, componentId, value }) => {
    console.log('save values', name, componentId, value)
    NavigationService.dispatch('element/saveValue', {
      id: componentId,
      values: {
        [name]: value,
      },
    })
  },
  100,
  { trailing: false }
)

const EditorHelper = {
  getPropertyFormName,
  getPropertyName,
  move,
  copy,
  reorder,
  calcStyle,
  updateStyle,
  updateValues,
}

export default EditorHelper
