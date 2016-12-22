import 'whatwg-fetch'

export const REQUEST_WEATHER = 'REQUEST_WEATHER'
export const RECEIVE_WEATHER = 'RECEIVE_WEATHER'
export const REQUEST_LOCATIONS = 'REQUEST_LOCATIONS'
export const RECEIVE_LOCATIONS = 'RECEIVE_LOCATIONS'
export const QUERY_LOCATION = 'QUERY_LOCATION'

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

function fetchWeather (state, location) {
  const { latitude, longitude } = state.locationsByQuery[location].items[0]
  return dispatch => {
    dispatch(requestWeather(location))
    const url = `http://localhost:8080/api/v1/wu/conditions?latitude=${latitude}&longitude=${longitude}`
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveWeather(location, json))
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
      longitude: item.lon
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
