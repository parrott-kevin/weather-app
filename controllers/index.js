const express = require('express')
const router = express.Router()

const weatherUnderground = require('./weatherUnderground')

router.use('/wu', weatherUnderground)

module.exports = router
