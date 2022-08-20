// Modules
const express = require('express')
const app = express()
const path = require('path')

//Load globals 
require(path.join(__dirname, 'globals'))

// External files
const {home, register, login} = require(path.join(appRoot, 'router'))
app.use(express.static(path.join(appRoot, 'public')))
app.set('views', path.join(appRoot, 'views'))

// Template engine
app.set('view engine', 'ejs')

// Utils
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Routes
app.use('/', home)
app.use('/register', register)
app.use('/login', login)

// Listen port
let port = process.env.PORT
if (port == null || port == "") {
  port = 3000  
}
app.listen(port)