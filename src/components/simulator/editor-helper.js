import uuid from 'uuid/v4'

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

const EditorHelper = {
  getPropertyFormName,
  getPropertyName,
  move,
  copy,
  reorder,
}

export default EditorHelper
