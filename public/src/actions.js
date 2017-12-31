import 'whatwg-fetch'

export const REQUEST_WEATHER = 'REQUEST_WEATHER'
export const RECEIVE_WEATHER = 'RECEIVE_WEATHER'
export const REQUEST_LOCATIONS = 'REQUEST_LOCATIONS'
export const RECEIVE_LOCATIONS = 'RECEIVE_LOCATIONS'
export const QUERY_LOCATION = 'QUERY_LOCATION'
export const REQUEST_FORECAST = 'REQUEST_FORECAST'
export const RECEIVE_FORECAST = 'RECEIVE_FORECAST'

export function queryLocation (query) {
  return {
    type: QUERY_LOCATION,
    query
  }
}

function requestWeather (location) {
  return {
    type: REQUEST_WEATHER,
    location
  }
}

function receiveWeather (location, json) {
  const results = {
    type: RECEIVE_WEATHER,
    location,
    weather: json.current_observation,
    receivedAt: Date.now()
  }
  console.log(results)
  return results
}

function requestForecast (location) {
  return {
    type: REQUEST_FORECAST,
    location
  }
}

function receiveForecast (location, json) {
  console.log(json.forecast.simpleforecast.forecastday[0].qpf_allday.in)
  const results = {
    type: RECEIVE_FORECAST,
    location,
    forecast: json.forecast.simpleforecast.forecastday[0].qpf_allday.in >= 0.25 ? 'Grab umbrella' : 'No umbrella needed',
    receivedAt: Date.now()
  }
  return results
}

function fetchForecast (zmw, location) {
  return dispatch => {
    dispatch(requestForecast(location))
    const url = `http://localhost:8080/api/v1/wu/forecast?zmw=${zmw}`
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveForecast(location, json)))
  }
}

function fetchWeather (state, location) {
  const { latitude, longitude, zmw } = state.locationsByQuery[location].items[0]
  return dispatch => {
    dispatch(requestWeather(location))
    const url = `http://localhost:8080/api/v1/wu/conditions?latitude=${latitude}&longitude=${longitude}`
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveWeather(location, json))
        // dispatch(fetchForecast(zmw, location))
      })
      .then(() => {
        dispatch(fetchForecast(zmw, location))
      })
  }
}

function shouldFetchWeather (state, location) {
  if (location === '' || state.locationsByQuery[location].items.length === 1) {
    return true
  } else {
    return false
  }
}

export function fetchWeatherIfNeeded (location) {
  return (dispatch, getState) => {
    if (shouldFetchWeather(getState(), location)) {
      return dispatch(fetchWeather(getState(), location))
    }
  }
}

function requestLocations (query) {
  return {
    type: REQUEST_LOCATIONS,
    query
  }
}

function receiveLocations (query, json) {
  const locations = json.RESULTS.map(item => {
    return {
      name: item.name,
      latitude: item.lat,
      longitude: item.lon,
      zmw: item.zmw
    }
  })
  const results = {
    type: RECEIVE_LOCATIONS,
    query,
    locations: locations.length > 10 ? locations.slice(0, 9) : locations,
    receivedAt: Date.now()
  }
  return results
}

function fetchLocations (query) {
  return dispatch => {
    dispatch(requestLocations(query))
    const url = `api/v1/wu/autocomplete/${query}`
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveLocations(query, json)))
  }
}

function shouldFetchLocations (state, query) {
  if (query === '') {
    return false
  }
  const locations = state.locationsByQuery[query]
  if (!locations) {
    return true
  } else {
    return false
  }
}

export function fetchLocationsIfNeeded (query) {
  return (dispatch, getState) => {
    if (shouldFetchLocations(getState(), query)) {
      return dispatch(fetchLocations(query))
    }
  }
}
