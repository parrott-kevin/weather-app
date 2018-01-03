export const SERVER_ERROR = 'SERVER_ERROR'
export const REQUEST_WEATHER = 'REQUEST_WEATHER'
export const RECEIVE_WEATHER = 'RECEIVE_WEATHER'
export const REQUEST_LOCATIONS = 'REQUEST_LOCATIONS'
export const RECEIVE_LOCATIONS = 'RECEIVE_LOCATIONS'
export const QUERY_LOCATION = 'QUERY_LOCATION'
export const CLEAR_QUERY = 'CLEAR_QUERY'

export function gather (actions, apiPromise) {
  actions.error = SERVER_ERROR
  return dispatch => {
    dispatch(request(actions.request))
    return apiPromise
      .then(json => {
        return dispatch(receive(actions.receive, json))
      })
      .catch(err => {
        dispatch(serverError(err))
      })
  }
}

export function request (type) {
  return { type }
}

export function receive (type, response) {
  return {
    type,
    response,
    receivedAt: (new Date()).toJSON().toString(),
  }
}

export function serverError ({ ok, status, message }) {
  return {
    type: SERVER_ERROR,
    ok,
    status,
    message,
  }
}

export function queryLocation (query) {
  return {
    type: QUERY_LOCATION,
    query,
  }
}

export function clearQuery () {
  return { type: CLEAR_QUERY }
}
