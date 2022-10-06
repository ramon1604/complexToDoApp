const path = require('path')
const Post = require(path.join(appRoot, 'tables/Post'))
const { sessionSave } = require(path.join(appRoot, 'server/sessions'))
const sendgrid = require('@sendgrid/mail')
sendgrid.setApiKey(process.env.SENDGRIDAPIKEY)

exports.createPost = async function (req, res) {
    res.render('create-post')
}

exports.savePost = async function (req, res) {
    try {
        req.body.author = res.locals.user._id
        let post = new Post(req.body)
        returnedData = await post.save()
        if (returnedData) {
            sessionSave(req, res, post.success, 'success', `/profile-posts/${req.body.author}/myPosts`, false)
        } else {
            throw 'Could not save post'
        }
    } catch (err) {
        console.log(err)
        sessionSave(req, res, post.errors, 'regErrors', '/', false)
    }
}

exports.viewPost = async function (req, res) {
    try {
        let post = new Post({ _id: req.params.id })
        returnedData = await post.view()
        if (returnedData) {
            res.render('view-post', returnedData)
        } else {
            throw 'Page not found'
        }
    } catch (err) {
        console.log(err)
        res.render('page-not-found')
    }
}

exports.profilePosts = async function (req, res) {
    try {
        let post = new Post({ _id: req.params.id, userType: req.params.userType })
        returnedData = await post.profile()
        if (returnedData) {
            returnedData.loggedUserData = res.locals.user
            returnedData.urlParams = { id: req.params.id, userType: req.params.userType }
            res.render('profile-posts', returnedData)
        } else {
            throw 'Page not found'
        }
    } catch (err) {
        console.log(err)
        res.render('page-not-found')
    }
}

exports.editPost = async function (req, res) {
    try {
        let post = new Post(req.body)
        returnedData = await post.edit()
        if (returnedData) {
            res.render('edit-post', returnedData)
        } else {
            throw 'Page not found'
        }
    } catch (err) {
        console.log(err)
        res.render('page-not-found')
    }
}

exports.updatePost = async function (req, res) {
    try {
        req.body.author = res.locals.user._id
        let post = new Post(req.body)
        returnedData = await post.update()
        if (returnedData.modifiedCount) {
            /*
                    try {
                        await sendgrid.send({
                            to: 'destination@hotmail.com',
                            from: 'origin@gmail.com',
                            subject: 'Congrats on a New Post!',
                            text: 'You did a great job.',
                            html: 'You did a <strong>great</strong> job.'
                        })
                    } catch (err) {
                        console.log(err)
                    }
            */
            sessionSave(req, res, post.success, 'success', 'edit-post', req.body)
        } else {
            throw 'Could not update post.'
        }
    } catch (err) {
        console.log(err)
        sessionSave(req, res, post.errors, 'errors', 'edit-post', req.body)
    }
}

exports.deletePost = async function (req, res) {
    try {
        req.body.author = res.locals.user._id
        let post = new Post(req.body)
        returnedData = await post.delete()
        if (returnedData.deletedCount) {
            sessionSave(req, res, post.success, 'success', `/profile-posts/${req.body.author}/myPosts`, false)
        } else {
            throw 'Could not delete post'
        }
    } catch (err) {
        console.log(err)
        sessionSave(req, res, post.errors, 'errors', `/profile-posts/${req.body.author}/myPosts`, false)
    }
}

exports.searchPosts = async function (req, res) {
    try {
        let post = new Post(req.body)
        returnedData = await post.search()
        if (returnedData) {
            res.json(returnedData)
        } else {
            throw 'Invalid data'
        }
    } catch (err) {
        console.log(err)
    }
}
