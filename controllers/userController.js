const { response } = require('express')
const path = require('path')
const User = require(path.join(appRoot, 'tables/User'))

exports.home = (req, res) => {
    res.render('home-guest')
}

exports.register = async (req, res) => {
    let user = new User(req.body)
    if (await user.register()) { res.send('Register successful') } else { res.send(user.errors) }
}

exports.login = async (req, res) => {
    let user = new User(req.body)
    if (await user.login()) { res.send('Login successful') } else { res.send(user.errors) }
}

