const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const controllers = require('./controllers/index')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use('/api/v1/', controllers)

module.exports = app
