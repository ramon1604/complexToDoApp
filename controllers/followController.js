const path = require('path')
const Follow = require(path.join(appRoot, 'tables/Follow'))
const { sessionSave } = require(path.join(appRoot, 'server/sessions'))

async function followAuthor(req, res) {
    let follow = new Follow(req.body)
    returnedData = await follow.follow()
    if (returnedData) {
        sessionSave(req, res, follow.success, 'success', `/profile-posts/${req.body.followingId}/myPosts`, false)
    } else {
        sessionSave(req, res, follow.errors, 'errors', `/profile-posts/${req.body.followingId}/myPosts`, false)
    }

}

async function unfollowAuthor(req, res) {
    let follow = new Follow(req.body)
    returnedData = await follow.unfollow()
    if (returnedData) {
        sessionSave(req, res, follow.success, 'success', `/profile-posts/${req.body.followingId}/myPosts`, false)
    } else {
        sessionSave(req, res, follow.errors, 'errors', `/profile-posts/${req.body.followingId}/myPosts`, false)
    }

}

module.exports = { followAuthor, unfollowAuthor}