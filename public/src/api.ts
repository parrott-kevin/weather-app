declare const API_PORT: number

export interface IExtendedError extends Error {
  ok?: boolean
  status?: number
}

export default class WeatherUnderground {
  public baseUri: string

  constructor (version: string = 'v1') {
    this.baseUri = `http://localhost:${API_PORT}/api/${version}/wu`
  }

  public checkResponseJSON (response: any) {
    if (!response.ok) {
      const err: IExtendedError = new Error(response.statusText)
      err.ok = response.ok
      err.status = response.status
      throw err
    } else {
      return response.text().then((text: string) => {
        const result = text ? JSON.parse(text) : { results: [] }
        return result
      })
    }
  }

  public getWeather (latitude: string, longitude: string) {
    return this.fetch(`${this.baseUri}/conditions?latitude=${latitude}&longitude=${longitude}`)
  }

  public getLocations (query: string) {
    return this.fetch(`${this.baseUri}/autocomplete/${query}`)
  }

  private fetch (uri: string, options = {}) {
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
