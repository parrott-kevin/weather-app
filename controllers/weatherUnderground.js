const router = require('express').Router()
const request = require('request')

const routeConfig = require('../config/routes')
const appConfig = require('../config/app')

router.get('/autocomplete/:query', (req, res) => {
  const url = routeConfig.weatherUnderground.autocomplete(req.params.query)
  request(url, (err, response, body) => {
    if (!err && res.statusCode === 200) {
      res.status(200).send(body)
    }
  })
})

router.get('/conditions', (req, res) => {
  const url = routeConfig.weatherUnderground.conditions(appConfig.apiKey, req.query.latitude, req.query.longitude)
  request(url, (err, response, body) => {
    if (!err && res.statusCode === 200) {
      res.status(200).send(body)
    }
  })
})

module.exports = router
