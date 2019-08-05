function getPropertyFormName({ name, componentId, id }) {
  return `${name}:${id}:${componentId}`
}

function getPropertyName(str) {
  return str.substr(0, str.indexOf(':'))
}

const EditorHelper = {
  getPropertyFormName,
  getPropertyName,
}

export default EditorHelper
