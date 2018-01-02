import React from 'react'
import PropTypes from 'prop-types'

export const WeatherDisplay = ({ name, weather }) => {
  if (Object.keys(weather.currentObservation).length > 0) {
    return (<div className='card'>
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

WeatherDisplay.propTypes = {
  name: PropTypes.string,
  weather: PropTypes.object
}
