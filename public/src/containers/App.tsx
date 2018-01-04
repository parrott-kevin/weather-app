import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

import WeatherDisplay from '../components/WeatherDisplay'
import {
  clearQuery,
  gather,
  queryLocation,
  RECEIVE_LOCATIONS,
  RECEIVE_WEATHER,
  REQUEST_LOCATIONS,
  REQUEST_WEATHER,
} from '../actions'

import WeatherUnderground from '../api'

import { ILocations, IWeather } from '../reducers'
import { Dispatch } from 'redux'

const wu = new WeatherUnderground()

interface ISelectedOption {
  value: string,
  label: string
}

interface IProps {
  dispatch: Dispatch<any>,
  locations: ILocations,
  query: string,
  weather: IWeather
}

class App extends Component <IProps, {}> {
  constructor (props: any) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  public handleInputChange (input: string) {
    const { dispatch } = this.props
    if (input) {
      const actions = {
        request: REQUEST_LOCATIONS,
        receive: RECEIVE_LOCATIONS,
      }
      dispatch(gather(actions, wu.getLocations(input)))
    }
  }

  public handleChange (selectedOption: ISelectedOption) {
    const { dispatch, locations } = this.props

    if (selectedOption) {
      dispatch(queryLocation(selectedOption.value))

      const location = locations.list.find(item => {
        return item.name === selectedOption.value
      })
      const actions = {
        request: REQUEST_WEATHER,
        receive: RECEIVE_WEATHER,
      }
      dispatch(gather(actions, wu.getWeather(location.lat, location.lon)))
    } else {
      dispatch(clearQuery())
    }
  }

  public render () {
    const { query, locations, weather } = this.props

    const selectedOptions: ISelectedOption[] = locations.list.map(item => {
      return {
        value: item.name,
        label: item.name,
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
              autoFocus={true}
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

interface IState {
  locations: ILocations,
  queriedLocation: string,
  weather: object
}

function mapStateToProps (state: IState) {
  const { locations, queriedLocation: query, weather } = state
  return {
    query,
    locations,
    weather,
  }
}

export default connect(mapStateToProps)(App)
