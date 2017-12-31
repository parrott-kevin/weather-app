import React from 'react'
import PropTypes from 'prop-types'
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
    const { dispatch } = this.props
    const input = event.target.value
    dispatch(queryLocation(input))
    dispatch(fetchLocationsIfNeeded(input))
  }

  handleSubmit (event) {
    const { dispatch, query } = this.props
    event.preventDefault()
    dispatch(fetchWeatherIfNeeded(query))
  }

  render () {
    const { query, locations, weather, isFetching } = this.props
    const options = locations.map((item) => {
      return <option value={item.name} key={item.name} />
    })
    return (
      <div className='container'>
        <div className='columns'>
          <div className='column'>
            <form onSubmit={this.handleSubmit} autoComplete='off'>
              <p className='control has-addons'>
                <input
                  id='locationInput'
                  type='text'
                  className='input is-expanded'
                  list='locations'
                  placeholder='Enter a location'
                  value={query}
                  onChange={this.handleChange} />
                <datalist id='locations'>
                  {options}
                </datalist>
                <input type='submit' value='Search' className='button is-primary' />
              </p>
            </form>
          </div>
        </div>
        <div className='columns'>
          <div className='column'>
            {!isFetching && <WeatherDisplay name={query} weather={weather} />}
          </div>
        </div>
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectedLocation: PropTypes.string,
  query: PropTypes.string,
  locations: PropTypes.array,
  weather: PropTypes.object,
  isFetching: PropTypes.bool
}

function mapStateToProps (state) {
  const { locationsByQuery, queriedLocation: query, weatherByLocation } = state
  const { items: locations } = locationsByQuery[query] || { items: [] }
  const { isFetching, weather } = weatherByLocation[query] || { isFetching: true, weather: {} }
  return {
    query,
    locations,
    isFetching,
    weather
  }
}

export default connect(mapStateToProps)(App)
