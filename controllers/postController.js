const path = require('path')
const Post = require(path.join(appRoot, 'tables/post'))
const { sessionSave } = require(path.join(appRoot, 'functions/sessions'))

async function createPost(req, res) {
    res.render('create-post', { user: req.session.user })
}

module.exports = { createPost }
