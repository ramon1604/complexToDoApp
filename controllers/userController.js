const path = require('path')
const User = require(path.join(appRoot, 'tables/User'))
const { sessionSave } = require(path.join(appRoot, 'functions/sessions'))

async function home(req, res) {
    if (req.session.user) {
        if (res.locals.user.acknowledged) {
            res.redirect('/logout')
        } else {
            res.render('home-dashboard')
        }
    } else {
        res.render('home-guest', { errors: req.flash('errors'), regErrors: req.flash('regErrors') })
    }
}

async function register(req, res) {
    let user = new User(req.body)
    returnedData = await user.register()
    if (returnedData) {
        req.session.user = returnedData
        sessionSave(req, res, 'ok', 'errors', '/')
    } else {
        sessionSave(req, res, user.errors, 'regErrors', '/')
    }
}

async function login(req, res) {
    if (!req.body.username) {
        sessionSave(req, res, ['Username is required'], 'errors', '/')
        return
    }
    let user = new User(req.body)
    let returnedData = await user.login()
    if (returnedData) {
        req.session.user = returnedData
        sessionSave(req, res, 'ok', 'errors', '/')
    } else {
        sessionSave(req, res, user.errors, 'errors', '/')
    }
}

async function logout(req, res) {
    if (req.session.user) {
        delete req.session.user
        if (res.locals.user.acknowledged) {
            await sessionSave(req, res, ['Sign In to continue.'], 'errors', '/')
        } else {
            await sessionSave(req, res, ['Session has been ended.'], 'errors', '/')
        }
    } else {
        res.redirect('/')
    }
}

module.exports = { logout, login, register, home }