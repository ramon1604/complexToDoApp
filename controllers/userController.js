const path = require('path')
const User = require(path.join(appRoot, 'tables/User'))

exports.home = (req, res) => {
    res.render('home-guest')
}

exports.register = (req, res) => {
    let user = new User(req.body)
    user.register().then((result) => {
        res.send(result)
    }).catch((error) => {
        user.errors.push(error)
        res.send(user.errors)
    })
}

exports.login = (req, res) => {
    let user = new User(req.body)
    user.login().then((result) => {
        res.send(result)
    }).catch((error) => {
        user.errors.push(error)
        res.send(user.errors)
    })
}

