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
    let post = new Post({ _id: req.params.id })
    returnedData = await post.view()
    if (returnedData) {
        res.render('view-post', returnedData)
    } else {
        res.render('page-not-found')
    }
}

async function profilePosts(req, res) {
    let post = new Post({ _id: req.session.user._id })
    returnedData = await post.profile()
    if (returnedData) {
        res.render('profile-posts', returnedData)
    } else {
        res.render('page-not-found')
    }
}

module.exports = { createPost, savePost, viewPost, profilePosts }
