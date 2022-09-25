// Modules
const csrf = require('csurf')
const express = require('express')

// Create express app
const app = express()
const path = require('path')
const sanitizeHTML = require('sanitize-html')

// Load globals
require(path.join(__dirname, 'globals'))

// Load sessionSave function
const { sessionSave } = require(path.join(appRoot, 'server/sessions'))

// Load router
const router = require(path.join(appRoot, 'router'))

// Load Middleware
app.use(sessionOptions)
app.use(flashOpts)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(csrf())

// Browser files
app.use(express.static(path.join(appRoot, 'browser')))

// Template engine
app.set('views', [path.join(appRoot, 'views'), path.join(appRoot, 'partials')])
app.set('view engine', 'ejs')

// Load locals variables
app.use((req, res, next) => {
  res.locals.user = req.session.user
  res.locals.errors = req.flash('errors')
  res.locals.success = req.flash('success')
  res.locals.csrfToken = req.csrfToken()
  next()
})

app.use(async (err, req, res, next) => {
  if (err) {
    if (err.code == "EBADCSRFTOKEN") {
      await sessionSave(req, res, ['Forgery detected.'], 'errors', '/', false)
    } else {
      console.log(err)
    }
  }
  next()
})

// Home Route
app.use('/', router.homeRoute)

// Listen for socket connection
const server = require('http').createServer(app)
const io = require('socket.io')(server)
io.use((socket, next) => {
  sessionOptions(socket.request, socket.request.res, next)
})
io.on('connection', (socket) => {
  if (socket.request.session.user) {
    let loggedUser = []
    loggedUser = socket.request.session.user
    socket.emit('loggedUser', loggedUser)
    socket.on('chatMsgFromBrowser', (data) => {
      data.user = socket.request.session.user
      socket.broadcast.emit('chatMsgFromServer', { message: sanitizeHTML(data.message), user: data.user })
    })
  }
})

// Listen port
let port = process.env.PORT
if (port == null || port == "") {
  port = 3000
}
server.listen(port)
