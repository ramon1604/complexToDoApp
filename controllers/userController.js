const path = require('path')
const User = require(path.join(appRoot, 'models/User'))

exports.home = (req, res) => {
    res.render('home-guest')
}

exports.register = (req, res) =>{
    let user = new User(req.body)
    user.register()
    if (user.errors.length) {
        res.send(user.errors)        
    } else {
        res.send("No errors.")
    }
}