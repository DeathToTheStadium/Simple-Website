const express = require('express')
const router = express.Router()
const controllers = require('../controllers/about.controller.js')

router.get('/about',controllers[0])

module.exports = router