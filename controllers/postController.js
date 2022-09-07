const path = require('path')
const Post = require(path.join(appRoot, 'tables/post'))
const { sessionSave } = require(path.join(appRoot, 'server/sessions'))

async function createPost(req, res) {
    res.render('create-post')
}

async function savePost(req, res) {
    req.body.author = res.locals.user._id
    let post = new Post(req.body)
    returnedData = await post.save()
    if (returnedData) {
        sessionSave(req, res, post.success, 'success', `/profile-posts/${req.body.author}`, false)
    } else {
        sessionSave(req, res, post.errors, 'regErrors', '/', false)
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
    let post = new Post({ _id: req.params.id })
    returnedData = await post.profile()
    if (returnedData) {
        res.render('profile-posts', returnedData)
    } else {
        res.render('page-not-found')
    }
}

async function editPost(req, res) {
    let post = new Post( req.body )
    returnedData = await post.edit()
    if (returnedData) {
        res.render('edit-post', returnedData)
    } else {
        res.render('page-not-found')
    }
}

async function updatePost(req, res) {
    let post = new Post( req.body )
    returnedData = await post.update()
    if (returnedData) {
        sessionSave(req, res, post.success, 'success', 'edit-post', req.body)
    } else {
        res.render('page-not-found')
    }
}

module.exports = { createPost, savePost, viewPost, profilePosts, editPost, updatePost }
