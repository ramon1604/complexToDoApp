const path = require('path')
const User = require(path.join(appRoot, 'tables/User'))
const { sessionSave } = require(path.join(appRoot, 'functions/sessions'))

exports.home = (req, res) => {
    if (req.session.user) {
        res.render('home-dashboard', { user: req.session.user })
    } else {
        res.render('home-guest', {errors: req.flash('errors'), regErrors: req.flash('regErrors')})
    }
}

exports.register = async (req, res) => {
    let user = new User(req.body)
    if (await user.register()) {
        req.session.user = user.data
        sessionSave(req, res, 'ok', 'errors')
    } else {
        sessionSave(req, res, user.errors, 'regErrors')
    }
}

exports.login = async (req, res) => {
    if (!req.body.username) {
        sessionSave(req, res, ['Username is required'], 'errors')
        return
    }
    let user = new User(req.body)
    if (await user.login()) {
        req.session.user = user.data
        sessionSave(req, res, 'ok', 'errors')
    } else {
        sessionSave(req, res, user.errors, 'errors')
    }
}

exports.logout = async (req, res) => {
    delete req.session.user
    await sessionSave(req, res, ['Session has been ended.'], 'errors')
}
