import { combineReducers } from 'redux'

import { REQUEST_LOCATIONS, RECEIVE_LOCATIONS, QUERY_LOCATION, REQUEST_WEATHER, RECEIVE_WEATHER } from './actions'

function queriedLocation (state = '', action) {
  switch (action.type) {
    case QUERY_LOCATION:
      return action.query
    default:
      return state
  }
}

function weather (state = { isFetching: false, weather: {} }, action) {
  switch (action.type) {
    case REQUEST_WEATHER:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_WEATHER:
      return Object.assign({}, state, {
        isFetching: false,
        weather: action.weather,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function weatherByLocation (state = {}, action) {
  switch (action.type) {
    case RECEIVE_WEATHER:
    case REQUEST_WEATHER:
      return Object.assign({}, {
        [action.location]: weather(state[action.location], action)
      })
    default:
      return state
  }
}

function locations (state = { isFetching: false, items: [] }, action) {
  switch (action.type) {
    case REQUEST_LOCATIONS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_LOCATIONS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.locations,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function locationsByQuery (state = {}, action) {
  switch (action.type) {
    case RECEIVE_LOCATIONS:
    case REQUEST_LOCATIONS:
      return Object.assign({}, state, {
        [action.query]: locations(state[action.query], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  weatherByLocation,
  locationsByQuery,
  queriedLocation
})

export default rootReducer
