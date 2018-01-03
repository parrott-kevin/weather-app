import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

import WeatherDisplay from '../components/WeatherDisplay'
import {
  queryLocation,
  clearQuery,
  gather,
  REQUEST_LOCATIONS,
  RECEIVE_LOCATIONS,
  REQUEST_WEATHER,
  RECEIVE_WEATHER
} from '../actions'

import WeatherUnderground from '../api'

const wu = new WeatherUnderground()

class App extends React.Component {
  constructor (props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleInputChange (input) {
    const { dispatch } = this.props
    if (input) {
      const actions = {
        request: REQUEST_LOCATIONS,
        receive: RECEIVE_LOCATIONS
      }
      dispatch(gather(actions, wu.getLocations(input)))
    }
  }

  handleChange (selectedOption) {
    const { dispatch, locations } = this.props

    if (selectedOption) {
      dispatch(queryLocation(selectedOption.value))

      const location = locations.list.find(item => {
        return item.name === selectedOption.value
      })
      const actions = {
        request: REQUEST_WEATHER,
        receive: RECEIVE_WEATHER
      }
      dispatch(gather(actions, wu.getWeather(location.lat, location.lon)))
    } else {
      dispatch(clearQuery())
    }
  }

  render () {
    const { query, locations, weather } = this.props

    const selectedOptions = locations.list.map(item => {
      return {
        value: item.name,
        label: item.name
      }
    })
    return (
      <div className='container'>
        <div className='columns'>
          <div className='column'>
            <Select
              name='form-field-name'
              value={query}
              onChange={this.handleChange}
              onInputChange={this.handleInputChange}
              options={selectedOptions}
              isLoading={locations.isFetching}
            />
          </div>
        </div>
        <div className='columns'>
          <div className='column'>
            <WeatherDisplay name={query} weather={weather} />
          </div>
        </div>
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  query: PropTypes.string,
  locations: PropTypes.object,
  weather: PropTypes.object
}

function mapStateToProps (state) {
  const { locations, queriedLocation: query, weather } = state
  return {
    query,
    locations,
    weather
  }
}

export default connect(mapStateToProps)(App)
