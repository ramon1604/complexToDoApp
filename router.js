const express = require('express')
const router = express.Router()
const path = require('path')
const { home, register, login, logout } = require(path.join(appRoot, 'controllers/userController'))
const { createPost, savePost, viewPost, profilePosts, editPost, updatePost, deletePost } = require(path.join(appRoot, 'controllers/postController'))
const { isLoggedin } = require(path.join(appRoot, 'server/sessions'))

module.exports = {
    // Users related routes
    homeRoute: router.get('/', home),
    registerRoute: router.post('/register', register),
    loginRoute: router.post('/login', login),
    logoutRoute: router.post('/logout', logout),
    logoutRoute2: router.get('/logout', logout),

    // Posts related routes
    createPostRoute: router.get('/create-post', isLoggedin, createPost),
    savePostRoute: router.post('/create-post', isLoggedin, savePost),
    viewPostRoute: router.get('/view-post/:id', isLoggedin, viewPost),
    profilePostsRoute: router.get('/profile-posts/:id', isLoggedin, profilePosts),
    editPostRoute: router.post('/edit-post', isLoggedin, editPost),
    updatePostRoute: router.post('/update-post', isLoggedin, updatePost),
    deletePostRoute: router.post('/delete-post', isLoggedin, deletePost),

    // Unknown related routes
    unknownRoutes: router.get('*', (req, res) => res.render('page-not-found'))
}