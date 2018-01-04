const path = require('path')
const fs = require('fs')
const util = require('util')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const router = require('express').Router()
const rpn = require('request-promise-native')

const readFileAsync = util.promisify(fs.readFile)
const secrets = async () => {
  try {
    const file = await readFileAsync(path.join(__dirname, './secrets.json'), { encoding: 'utf8' })
    return JSON.parse(file)
  } catch (err) {
    console.log(err)
    throw err
  }
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

function wrapAsync (fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next)
  }
}

router.get('/autocomplete/:query', wrapAsync(async (req, res) => {
  const { query } = req.params
  const url = `http://autocomplete.wunderground.com/aq?query=${query}`
  const results = await rpn(url)
  res.send(results)
}))

router.get('/conditions', wrapAsync(async (req, res) => {
  const { latitude, longitude } = req.query

  const { apiKey } = await secrets()

  const url = `http://api.wunderground.com/api/${apiKey}/geolookup/conditions/q/${latitude},${longitude}.json`
  const results = await rpn(url)
  res.send(results)
}))

app.use('/api/v1/wu', router)

app.use((error, req, res, next) => {
  console.log(error.message)
  res.status(500).json({ message: error.message })
})

const PORT = process.env.PORT || 9000

app.set('port', PORT)
const server = app.listen(app.get('port'), () => {
  console.log('Server started on http://localhost:' + server.address().port)
})
