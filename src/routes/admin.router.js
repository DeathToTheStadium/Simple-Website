const express = require('express')
const router = express.Router()

const controller = require('../controllers/admin.controller')
router.get('/',controller[0])
router.get('/create',controller[1])
router.post('/save',controller[2])
router.get('/edit/:id',controller[3])
router.post('/update/:objectId',controller[4])
router.get('/delete/:objectId',controller[5])
router.get('/login',controller[6])
module.exports = router