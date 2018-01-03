import 'babel-polyfill'
import 'whatwg-fetch'

import React from 'react'
import {render} from 'react-dom'

import 'bulma/css/bulma.css'

import Root from './containers/Root.jsx'

render(<Root compiler='TypeScript' framework='React' />, document.getElementById('app'))
