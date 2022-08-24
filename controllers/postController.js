const path = require('path')
const Post = require(path.join(appRoot, 'tables/post'))

exports.createPost = async (req, res) => {
    if (req.session.user) {
        res.render('create-post', { user: req.session.user })
    } else {
        res.redirect('/')
    }
}