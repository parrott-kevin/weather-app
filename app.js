const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const controllers = require('./controllers/index')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/v1/', controllers)

module.exports = app
