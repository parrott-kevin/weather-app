export default class WeatherUnderground {
  constructor (version = 'v1') {
    this.baseUri = `http://localhost:${API_PORT}/api/${version}/wu`
  }

  checkResponseJSON (response) {
    if (!response.ok) {
      const err = new Error(response.statusText)
      err.ok = response.ok
      err.status = response.status
      throw err
    } else {
      return response.text().then(text => {
        const result = text ? JSON.parse(text) : { results: [] }
        return result
      })
    }
  }

  _fetch (uri, options = {}) {
    return new Promise((resolve, reject) => {
      fetch(uri, options)
        .then(this.checkResponseJSON)
        .then(json => {
          return resolve(json)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  getWeather (latitude, longitude) {
    return this._fetch(`${this.baseUri}/conditions?latitude=${latitude}&longitude=${longitude}`)
  }

  getLocations (query) {
    return this._fetch(`${this.baseUri}/autocomplete/${query}`)
  }
}
