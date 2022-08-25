const express = require('express')
const router = express.Router()
const path = require('path')
const { home, register, login, logout } = require(path.join(appRoot, 'controllers/userController'))
const { createPost, savePost, viewPost } = require(path.join(appRoot, 'controllers/postController'))
const { isLoggedin } = require(path.join(appRoot, 'functions/sessions'))

module.exports = {
    // Users related routes
    homeRoute: router.get('/', home),
    registerRoute: router.post('/register', register),
    loginRoute: router.post('/login', login),
    logoutRoute: router.post('/logout', logout),

    // Posts related routes
    createPostRoute: router.get('/create-post', isLoggedin, createPost),
    savePostRoute: router.post('/create-post', isLoggedin, savePost),
    viewPostRoute: router.get('/view-post/:id', viewPost)
}