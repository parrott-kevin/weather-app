import React from 'react'

export const WeatherDisplay = ({name, weather}) => {
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">{name}</p>
      </header>
      <div className="card-content">
        <div className="content">
          <p>{weather.weather}</p>
          <p>Actual {weather.temperature_string}</p>
          <p>Feels Like {weather.feelslike_string}</p>
        </div>
      </div>
    </div>
  )
}
