const path = require('path')
const APIUser = require(path.join(appRoot, 'server/api/tables/apiUser'))
const jwt = require('jsonwebtoken')

async function apiLogin(req, res) {
    try {
        let apiUser = new APIUser(req.body)
        let result = await apiUser.login()
        if (result) {
        res.json({token: jwt.sign({_id: result._id},process.env.JWTSECRET, {expiresIn: '30d'})})
        } else {
            res.json('Invalid username/password')
        }
    } catch (error) {
        res.json(error)
    }
}

module.exports = { apiLogin }