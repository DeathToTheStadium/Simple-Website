const express = require('express')
const router = express.Router()

const controller = require('../controllers/admin.controller')

router.get('/create',controller[0])
router.get('/update',controller[0])
router.get('/create',controller[0])
module.exports = router