const express = require('express')
const router = express.Router()

const controller = require('../controllers/blog.controller')

router.get('/',controller[0])
router.get('/article/:id',controller[1])
module.exports = router