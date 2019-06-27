export const LoadingType = {
  none: 0,
  top: 1,
  modal: 2,
  fetchingNext: 3,
}

export const createAction = type => payload => ({ type, payload })
export const noop = () => {}

export const sleep = async longTime => new Promise(resolve => setTimeout(resolve, longTime))
