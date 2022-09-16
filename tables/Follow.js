const sanitizeHTML = require('sanitize-html')
const ObjectId = require('mongodb').ObjectId

class Follow {
    constructor(data) {
        this.data = data
        this.errors = []
        this.success = []
    }

    async validateFollow(operation) {
        if (this.data.followingId == this.data.followerId) {
            this.errors.push(`You can not follow yourself.`)
            return false
        }
        if (typeof (this.data.followingId) != "string" || !ObjectId.isValid(this.data.followingId)) {
            return false
        } else {
            const userFollowing = await db.collection("users").findOne({ _id: ObjectId(this.data.followingId) })
            if (userFollowing) {
                const resultfollowers = await db.collection("followers").findOne({ followingId: ObjectId(this.data.followingId), followerId: ObjectId(this.data.followerId) })
                if (operation == 'follow') {
                    if (!resultfollowers) {
                        return userFollowing.username
                    } else {
                        this.errors.push(`Already Following ${userFollowing.username}`)
                        return false
                    }
                } else {
                    if (resultfollowers) {
                        return userFollowing.username
                    } else {
                        this.errors.push(`Already not Following ${userFollowing.username}`)
                        return false
                    }
                }

            } else {
                this.errors.push(`The follower you are searching does not exists`)
                return false
            }
        }
    }

    async follow() {
        try {
            let follower = await this.validateFollow('follow')
            if (follower) {
                const registerFollower = await db.collection("followers").insertOne({ followingId: ObjectId(this.data.followingId), followerId: ObjectId(this.data.followerId) })
                this.success.push(`Successfully started following ${follower}`)
                return registerFollower
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
        }

    }

    async unfollow() {
        try {
            let follower = await this.validateFollow('unfollow')
            if (follower) {
                const removeFollower = await db.collection("followers").deleteOne({ followingId: ObjectId(this.data.followingId), followerId: ObjectId(this.data.followerId) })
                this.success.push(`Successfully stopped following ${follower}`)
                return removeFollower
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
        }

    }

}

module.exports = Follow