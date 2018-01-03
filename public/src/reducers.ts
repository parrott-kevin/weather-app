import { combineReducers } from 'redux'

import {
  CLEAR_QUERY,
  QUERY_LOCATION,
  RECEIVE_LOCATIONS,
  RECEIVE_WEATHER,
  REQUEST_LOCATIONS,
  REQUEST_WEATHER,
} from './actions'

function queriedLocation (state = '', action) {
  switch (action.type) {
    case QUERY_LOCATION:
      return action.query
    case CLEAR_QUERY:
      return ''
    default:
      return state
  }
}

function weather (state = { isFetching: false, currentObservation: {} }, action) {
  switch (action.type) {
    case REQUEST_WEATHER:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_WEATHER:
      return Object.assign({}, state, {
        isFetching: false,
        currentObservation: action.response.current_observation,
        receivedAt: action.receivedAt,
      })
    case CLEAR_QUERY:
      return {
        isFetching: false,
        currentObservation: {},
      }
    default:
      return state
  }
}

function locations (state = { isFetching: false, list: [] }, action) {
  switch (action.type) {
    case REQUEST_LOCATIONS:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_LOCATIONS:
      return Object.assign({}, state, {
        isFetching: false,
        list: action.response.RESULTS,
        receivedAt: action.receivedAt,
      })
    case CLEAR_QUERY:
      return {
        isFetching: false,
        list: [],
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  weather,
  locations,
  queriedLocation,
})

export default rootReducer
