import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import 'whatwg-fetch'

import 'bulma/css/bulma.css'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      options: [],
      value: ''
    }
  }

  checkSelection (input) {
    for (let i = this.state.options.length - 1; i >= 0; i--) {
      const option = this.state.options[i]
      if (option.label === input) {
        return {
          latitude: option.latitude,
          longitude: option.longitude
        }
      }
    }
    return false
  }
  getWeather () {
    const url = `http://localhost:8080/api/v1/wu/conditions?latitude=${this.state.latitude}&longitude=${this.state.longitude}`
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log(json)
      })
  }
  getLocations (event) {
    const input = event.target.value
    this.setState({value: input})
    if (!input || input.length < 3) {
      this.setState({options: []})
    } else {
      const selection = this.checkSelection(input)
      if (selection) {
        this.setState({
          latitude: selection.latitude,
          longitude: selection.longitude
        })
      } else {
        const url = `api/v1/wu/autocomplete/${input}`
        return fetch(url)
          .then(response => response.json())
          .then((json) => {
            const options = json.RESULTS.map((item, index) => {
              return {
                label: item.name,
                latitude: item.lat,
                longitude: item.lon
              }
            })
            if (options.length > 10) {
              this.setState({options: options.slice(0, 9)})
            } else {
              this.setState({options})
            }
          })
      }
    }
  }

  handleSubmit (event) {
    this.getWeather()
    event.preventDefault()
  }
  render () {
    const options = this.state.options.map((item) => {
      return <option value={item.label} key={item.label}></option>
    })
    return (
      <div className="container">
        <div className="columns">
          <div className="column">
            <form onSubmit={this.handleSubmit.bind(this)}>
              <p className="control has-addons">
                <input
                  id="locationInput"
                  type="text"
                  className="input is-expanded"
                  list="locations"
                  placeholder="Enter a location"
                  value={this.state.value}
                  data-latitude={this.state.latitude}
                  data-longitude={this.state.longitude}
                  onChange={this.getLocations.bind(this)} />
                <datalist id="locations">
                {options}
                </datalist>
                <input type="submit" value="Search" className="button is-primary" />
              </p>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'))
