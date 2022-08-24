// Modules
const express = require('express')
const app = express()
const path = require('path')

//Load globals
require(path.join(__dirname, 'globals'))

//Load utils
app.use(sessionOptions)
app.use(flashOpts)

// External files
const { home, register, login, logout, createPost } = require(path.join(appRoot, 'router'))
app.use(express.static(path.join(appRoot, 'browser')))
app.set('views', [path.join(appRoot, 'views'), path.join(appRoot, 'partials')])

// Template engine
app.set('view engine', 'ejs')

// Utils
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Home Route
app.use('/', home)

//User Routes
app.use('/register', register)
app.use('/login', login)
app.use('/logout', logout)

//Post Routes
app.use('/register', createPost)

// Listen port
let port = process.env.PORT
if (port == null || port == "") {
  port = 3000
}
app.listen(port)