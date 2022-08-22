const express = require('express')
const router = express.Router()
const path = require('path')
const {home, register, login, logout} = require(path.join(appRoot, 'controllers/userController'))

exports.home = router.get('/', home)
exports.register = router.post('/register', register)
exports.login =  router.post('/login', login)
exports.logout =  router.post('/logout', logout)


