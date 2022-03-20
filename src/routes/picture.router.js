const express = require('express')
const router = express.Router()
const controllers = require('../controllers/picture.controller.js')

router.get('/picture',controllers[0])



module.exports = router