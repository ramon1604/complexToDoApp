const path = require('path')
const Post = require(path.join(appRoot, 'tables/Post'))
const { sessionSave } = require(path.join(appRoot, 'server/sessions'))

async function createPost(req, res) {
    res.render('create-post')
}

async function savePost(req, res) {
    req.body.author = res.locals.user._id
    let post = new Post(req.body)
    returnedData = await post.save()
    if (returnedData) {
        sessionSave(req, res, post.success, 'success', `/profile-posts/${req.body.author}/myPosts`, false)
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
    let post = new Post({ _id: req.params.id, userType: req.params.userType })
    returnedData = await post.profile()
    if (returnedData) {
        returnedData.loggedUserData = res.locals.user
        returnedData.urlParams = { id: req.params.id, userType: req.params.userType }
        res.render('profile-posts', returnedData)
    } else {
        res.render('page-not-found')
    }
}

async function editPost(req, res) {
    let post = new Post(req.body)
    returnedData = await post.edit()
    if (returnedData) {
        res.render('edit-post', returnedData)
    } else {
        res.render('page-not-found')
    }
}

async function updatePost(req, res) {
    req.body.author = res.locals.user._id
    let post = new Post(req.body)
    returnedData = await post.update()
    if (returnedData.modifiedCount) {
        sessionSave(req, res, post.success, 'success', 'edit-post', req.body)
    } else {
        sessionSave(req, res, post.errors, 'errors', 'edit-post', req.body)
    }
}

async function deletePost(req, res) {
    req.body.author = res.locals.user._id
    let post = new Post(req.body)
    returnedData = await post.delete()
    if (returnedData.deletedCount) {
        sessionSave(req, res, post.success, 'success', `/profile-posts/${req.body.author}/myPosts`, false)
    } else {
        sessionSave(req, res, post.errors, 'errors', `/profile-posts/${req.body.author}/myPosts`, false)
    }
}

async function searchPosts(req, res) {
    let post = new Post(req.body)
    returnedData = await post.search()
    if (returnedData) {
        res.json(returnedData)
    } else {
        console.log('Invalid data')
    }
}
module.exports = { createPost, savePost, viewPost, profilePosts, editPost, updatePost, deletePost, searchPosts }
