const express = require('express')
const apiRouter = express.Router()
const path = require('path')
const { apiLogin } = require(path.join(appRoot, 'server/api/controllers/apiUserController'))
const { apiCreatePost, apiDeletePost, apiPostsByAuthorId } = require(path.join(appRoot, 'server/api/controllers/apiPostController'))
const { apiIsLoggedin } = require(path.join(appRoot, 'server/sessions'))
const cors = require('cors')

apiRouter.use(cors())

module.exports = {
    // API Users related routes
    apiLoginRoute: apiRouter.post('/login', apiLogin),
    apiCreatePostRoute: apiRouter.post('/create-post',apiIsLoggedin, apiCreatePost),
    apiDeletePostRoute: apiRouter.post('/delete-post', apiIsLoggedin, apiDeletePost),
    apiPostsByAuthorIdRoute: apiRouter.get('/postsByAuthorId/:authorId', apiPostsByAuthorId),


    // Unknown related routes
    apiGetRoute: apiRouter.get('*', (req, res) => res.json('Invalid request')),
    apiPostRoute: apiRouter.post('*', (req, res) => res.json('Invalid request')),
}