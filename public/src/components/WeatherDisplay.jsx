import React from 'react'
import PropTypes from 'prop-types'

export const WeatherDisplay = ({ name, weather }) => {
  return (
    <div className='card'>
      <header className='card-header'>
        <p className='card-header-title'>{name}</p>
      </header>
      <div className='card-content'>
        <div className='content'>
          <p>{weather.weather}</p>
          <p>Actual {weather.temperature_string}</p>
          <p>Feels Like {weather.feelslike_string}</p>
        </div>
      </div>
    </div>
  )
}

WeatherDisplay.propTypes = {
  name: PropTypes.string,
  weather: PropTypes.object
}
