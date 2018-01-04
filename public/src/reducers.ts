import { combineReducers } from 'redux'

import {
  CLEAR_QUERY,
  IQueryLocation,
  QUERY_LOCATION,
  IReceive,
  RECEIVE_LOCATIONS,
  RECEIVE_WEATHER,
  REQUEST_LOCATIONS,
  REQUEST_WEATHER,
} from './actions'

function queriedLocation (state = '', action: IQueryLocation) {
  switch (action.type) {
    case QUERY_LOCATION:
      return action.query
    case CLEAR_QUERY:
      return ''
    default:
      return state
  }
}

interface ICurrentObservation {
  weather?: string,
  temperature_string?: string,
  feelslike_string?: string
}

export interface IWeather {
  isFetching: boolean,
  currentObservation: ICurrentObservation,
  receivedAt?: any
}

function weather (state: IWeather = { isFetching: false, currentObservation: {} }, action: IReceive) {
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

interface IWeatherUndergroundConditions {
  name: string,
  lat: string,
  lon: string
}

export interface ILocations {
  isFetching: boolean,
  list: IWeatherUndergroundConditions[],
  receivedAt?: string,
}

function locations (state: ILocations = { isFetching: false, list: [] }, action: IReceive): ILocations {
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
