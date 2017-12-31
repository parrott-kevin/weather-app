import React from 'react'
import { connect } from 'react-redux'

import { WeatherDisplay } from '../components/WeatherDisplay.jsx'
import { fetchWeatherIfNeeded, fetchLocationsIfNeeded, queryLocation } from '../actions'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    const { dispatch, selectedLocation } = this.props
    dispatch(fetchLocationsIfNeeded(selectedLocation))
  }

  handleChange (event) {
    const input = event.target.value
    this.props.dispatch(queryLocation(input))
    this.props.dispatch(fetchLocationsIfNeeded(input))
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.dispatch(fetchWeatherIfNeeded(this.props.query))
  }

  render () {
    const { query, locations, weather, isFetching, forecast } = this.props
    const options = locations.map((item) => {
      return <option value={item.name} key={item.name}></option>
    })
    return (
      <div className="container">
        <div className="columns">
          <div className="column">
            <form onSubmit={this.handleSubmit} autoComplete="off">
              <p className="control has-addons">
                <input
                  id="locationInput"
                  type="text"
                  className="input is-expanded"
                  list="locations"
                  placeholder="Enter a location"
                  value={query}
                  onChange={this.handleChange} />
                <datalist id="locations">
                {options}
                </datalist>
                <input type="submit" value="Search" className="button is-primary" />
              </p>
            </form>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            {!isFetching && <WeatherDisplay name={query} weather={weather} forecast={forecast} />}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { locationsByQuery, queriedLocation: query, weatherByLocation, forecastByLocation } = state
  const { items: locations } = locationsByQuery[query] || { items: [] }
  const { isFetching, weather } = weatherByLocation[query] || { isFetching: true, weather: {} }
  console.log(forecastByLocation)
  const { forecast } = forecastByLocation[query] || { forecast: '' }
  return {
    query,
    locations,
    isFetching,
    weather,
    forecast
  }
}

export default connect(mapStateToProps)(App)
