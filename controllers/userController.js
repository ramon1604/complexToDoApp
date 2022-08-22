const path = require('path')
const User = require(path.join(appRoot, 'tables/User'))

exports.home = (req, res) => {
    if (req.session.user) {
        res.send('Welcome ' + req.session.user.username)
    } else {
        res.render('home-guest')
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
    let user = new User(req.body)
    if (await user.login()) {
        req.session.user = user.data
        res.send('Login successful')
    } else { res.send(user.errors) }
}

