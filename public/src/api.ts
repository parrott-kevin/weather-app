declare const API_PORT: number

interface IWeatherUnderground {
  checkResponseJSON(response: any)
  getWeather(latitude: string, longitude: string)
  getLocations(query: string)
}

interface IExtendedError extends Error {
  ok?: boolean
  status?: number
}

export default class WeatherUnderground implements IWeatherUnderground {
  public baseUri: string

  constructor (version = 'v1') {
    this.baseUri = `http://localhost:${API_PORT}/api/${version}/wu`
  }

  public checkResponseJSON (response) {
    if (!response.ok) {
      const err: IExtendedError = new Error(response.statusText)
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

  public getWeather (latitude, longitude) {
    return this.fetch(`${this.baseUri}/conditions?latitude=${latitude}&longitude=${longitude}`)
  }

  public getLocations (query) {
    return this.fetch(`${this.baseUri}/autocomplete/${query}`)
  }

  private fetch (uri, options = {}) {
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

}
