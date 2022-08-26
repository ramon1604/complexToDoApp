const path = require('path')
const Post = require(path.join(appRoot, 'tables/post'))
const { sessionSave } = require(path.join(appRoot, 'functions/sessions'))

async function createPost(req, res) {
    res.render('create-post')
}

async function savePost(req, res) {
    req.body.userId = req.session.user._id
    let post = new Post(req.body)
    returnedData = await post.save()
    if (returnedData) {
        sessionSave(req, res, 'ok', 'errors', '/create-post')
    } else {
        sessionSave(req, res, post.errors, 'regErrors', '/')
    }
}

async function viewPost(req, res) {
    let viewData = {}
    viewData._id = req.params.id
    let post = new Post(viewData)
    returnedData = await post.view()
    if (returnedData) {
        res.render('view-post', returnedData)
    } else {
        res.sendStatus(404)
    }
}

module.exports = { createPost, savePost, viewPost }
