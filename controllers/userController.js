const { dirname } = require('path')
const path = require('path')
const {User} = require(path.join(appRoot, 'models/User'))

exports.home = (req, res) => {
    res.render('home-guest')
}

exports.register = (req, res) =>{
    console.log(req.body)
    res.send("register")
}