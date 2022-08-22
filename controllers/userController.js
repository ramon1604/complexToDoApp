const path = require('path')
const User = require(path.join(appRoot, 'tables/User'))
const { sessionSave } = require(path.join(appRoot, 'functions/sessions'))

exports.home = (req, res) => {
    if (req.session.user) {
        res.render('home-dashboard', { user: req.session.user })
    } else {
        res.render('home-guest', {errors: req.flash('errors')})
    }
}

exports.register = async (req, res) => {
    let user = new User(req.body)
    if (await user.register()) {
        res.send('Register successful')
    } else {
        res.send(user.errors)
    }
}

exports.login = async (req, res) => {
    if (!req.body.username) {
        sessionSave(req, res, ['Username is required'])
        return
    }
    let user = new User(req.body)
    if (await user.login()) {
        req.session.user = user.data
        sessionSave(req, res, 'ok')
    } else {
        sessionSave(req, res, user.errors)
    }
}

exports.logout = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.send('Error')
        } else {
            res.redirect('/')
        }
    })
}
