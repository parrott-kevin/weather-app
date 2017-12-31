const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const controllers = require('./controllers/index')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public/dist')))

app.use('/api/v1/', controllers)
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/dist', 'index.html'))
// })

module.exports = app
