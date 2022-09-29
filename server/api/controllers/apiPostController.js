const path = require('path')
const APIPost = require(path.join(appRoot, 'server/api/tables/apiPost'))
const jwt = require('jsonwebtoken')

async function apiCreatePost(req, res) {
    try {
        let apiPost = new APIPost(req.body)
        delete req.body.token
        req.body.author = req.apiUser._id
        result = await apiPost.create()
        if (result.acknowledged) {
            res.json('success')
        } else {
            res.json('Could not create post.')
        }
    } catch (error) {
        res.json(error)
    }
}

module.exports = { apiCreatePost }