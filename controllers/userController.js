const path = require('path')
const User = require(path.join(appRoot, 'tables/User'))
const { sessionSave } = require(path.join(appRoot, 'functions/sessions'))

function home(req, res) {
    if (req.session.user) {
        res.render('home-dashboard')
    } else {
        res.render('home-guest', { errors: req.flash('errors'), regErrors: req.flash('regErrors') })
    }
}

async function register(req, res) {
    let user = new User(req.body)
    if (await user.register()) {
        req.session.user = user.data
        sessionSave(req, res, 'ok', 'errors','/')
    } else {
        sessionSave(req, res, user.errors, 'regErrors','/')
    }
}

async function login(req, res) {
    if (!req.body.username) {
        sessionSave(req, res, ['Username is required'], 'errors','/')
        return
    }
    let user = new User(req.body)
    let loggedUser = await user.login()
    if (loggedUser) {
        req.session.user = loggedUser
        sessionSave(req, res, 'ok', 'errors','/')
    } else {
        sessionSave(req, res, user.errors, 'errors','/')
    }
}

async function logout(req, res) {
    delete req.session.user
    await sessionSave(req, res, ['Session has been ended.'], 'errors','/')
}

module.exports = { logout, login, register, home }