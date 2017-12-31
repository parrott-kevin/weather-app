const router = require('express').Router()
const request = require('request')

const appConfig = require('../config/app')

router.get('/autocomplete/:query', (req, res) => {
  const { query } = req.params
  const url = `http://autocomplete.wunderground.com/aq?query=${query}`
  request(url, (err, response, body) => {
    if (!err && res.statusCode === 200) {
      res.status(200).send(body)
    }
  })
})

router.get('/conditions', (req, res) => {
  const { latitude, longitude } = req.query
  const url = `http://api.wunderground.com/api/${appConfig.apiKey}/geolookup/conditions/q/${latitude},${longitude}.json`
  request(url, (err, response, body) => {
    if (!err && res.statusCode === 200) {
      res.status(200).send(body)
    }
  })
})

router.get('/forecast', (req, res) => {
  const { zmw } = req.query
  const url = `http://api.wunderground.com/api/${appConfig.apiKey}/geolookup/forecast/q/zmw:${zmw}.json`
  request(url, (err, response, body) => {
    if (!err && res.statusCode === 200) {
      res.status(200).send(body)
    }
  })
})

module.exports = router
