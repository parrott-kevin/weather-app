
import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import 'whatwg-fetch'

import 'bulma/css/bulma.css'

import Root from './containers/Root.jsx'

render(<Root />, document.getElementById('app'))
