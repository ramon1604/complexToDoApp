const path = require('path')
const APIPost = require(path.join(appRoot, 'server/api/tables/apiPost'))
const jwt = require('jsonwebtoken')

async function apiCreatePost(req, res) {
    try {
        let apiPost = new APIPost(req.body)
        delete req.body.token
        req.body.author = req.apiUser._id
        let result = await apiPost.create()
        if (result.acknowledged) {
            res.json('success')
        } else {
            res.json('Could not create post.')
        }
    } catch (error) {
        res.json(error)
    }
}

async function apiDeletePost(req, res) {
    try {
        let apiPost = new APIPost(req.body)
        delete req.body.token
        req.body.author = req.apiUser._id
        let result = await apiPost.delete()
        if (result.deletedCount) {
            res.json('success')
        } else {
            res.json('Could not delete post.')
        }
    } catch (error) {
        res.json(error)
    }
}

async function apiPostsByAuthorId(req, res) {
    try {
        let apiPost = new APIPost(req.params.authorId)
        let result = await apiPost.postsByAuthorId()
        if (result) {
            res.json(result)
        } else {
            res.json('Could not retrieve posts by authorId.')
        }
    } catch (error) {
        res.json(error)
    }
}

module.exports = { apiCreatePost, apiDeletePost, apiPostsByAuthorId }