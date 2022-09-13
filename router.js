const express = require('express')
const router = express.Router()
const path = require('path')
const { home, register, login, logout } = require(path.join(appRoot, 'controllers/userController'))
const { createPost, savePost, viewPost, profilePosts, editPost, updatePost, deletePost, searchPosts } = require(path.join(appRoot, 'controllers/postController'))
const { followAuthor, unfollowAuthor } = require(path.join(appRoot, 'controllers/followController'))
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
    searchPostRoute: router.post('/search-posts', isLoggedin, searchPosts),

    // Followers related routes
    followAuthorRoute: router.post('/follow-author', isLoggedin, followAuthor),
    unfollowAuthorRoute: router.post('/unfollow-author', isLoggedin, unfollowAuthor),

    // Unknown related routes
    unknownRoutes: router.get('*', (req, res) => res.render('page-not-found'))
}