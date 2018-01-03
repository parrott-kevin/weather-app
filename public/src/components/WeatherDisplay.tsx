import React, { Component } from 'react'

interface IProps {
  name: string
  weather: any
}

export default class WeatherDisplay extends Component <IProps, {}> {
  public render () {
    const { name, weather } = this.props
    if (Object.keys(weather.currentObservation).length > 0) {
      return (
        <div className='card'>
          <header className='card-header'>
            <p className='card-header-title'>{name}</p>
          </header>
          <div className='card-content'>
            <div className='content'>
              <p>{weather.currentObservation.weather}</p>
              <p>Actual {weather.currentObservation.temperature_string}</p>
              <p>Feels Like {weather.currentObservation.feelslike_string}</p>
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}
