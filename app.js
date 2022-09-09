// Modules
const express = require('express')
const app = express()
const path = require('path')

//Load globals
require(path.join(__dirname, 'globals'))

//Load utils from globals
app.use(sessionOptions)
app.use(flashOpts)

//Load locals variables
app.use((req, res, next) => {
  res.locals.user = req.session.user
  res.locals.errors = req.flash('errors')
  res.locals.success = req.flash('success')
  next()
})

// Browser files
app.use(express.static(path.join(appRoot, 'browser')))

// Template engine
app.set('views', [path.join(appRoot, 'views'), path.join(appRoot, 'partials')])
app.set('view engine', 'ejs')

// Utils
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Home Route
const { homeRoute } = require(path.join(appRoot, 'router'))
app.use('/', homeRoute)

// Listen port
let port = process.env.PORT
if (port == null || port == "") {
  port = 3000
}
app.listen(port)