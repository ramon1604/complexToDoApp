// Modules
const express = require('express')
const app = express()
const path = require('path')

//Load globals
require(path.join(__dirname, 'globals'))

//Load utils
app.use(sessionOptions)
app.use(flashOpts)

//Load locals for ejs
app.use((req, res, next) => {
  res.locals.user = req.session.user
  next()
})

// External files
const { homeRoute, unknownRoutes } = require(path.join(appRoot, 'router'))
app.use(express.static(path.join(appRoot, 'browser')))
app.set('views', [path.join(appRoot, 'views'), path.join(appRoot, 'partials')])

// Template engine
app.set('view engine', 'ejs')

// Utils
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Home Route
app.use('/', homeRoute)
app.all('*', unknownRoutes);

// Listen port
let port = process.env.PORT
if (port == null || port == "") {
  port = 3000
}
app.listen(port)