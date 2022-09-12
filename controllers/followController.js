const path = require('path')
const Follow = require(path.join(appRoot, 'tables/Follow'))
const { sessionSave } = require(path.join(appRoot, 'server/sessions'))

async function followAuthor(req, res) {
    req.body.followerId = res.locals.user._id
    let follow = new Follow(req.body)
    returnedData = await follow.register()
    if (returnedData) {
        sessionSave(req, res, follow.success, 'success', `/profile-posts/${req.body.authorId}`, false)
    } else {
        sessionSave(req, res, follow.errors, 'errors', `/profile-posts/${req.body.authorId}`, false)
    }

}

module.exports = { followAuthor }