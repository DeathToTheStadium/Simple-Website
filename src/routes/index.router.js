const express = require('express')
const router = express.Router()

const controllers = require('../controllers/index.controller.js')

console.log(controllers)

router.get('/home',controllers[0])


module.exports = router