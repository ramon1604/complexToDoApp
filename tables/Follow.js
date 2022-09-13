const sanitizeHTML = require('sanitize-html')
const ObjectId = require('mongodb').ObjectId

class Follow {
    constructor(data) {
        this.data = data
        this.errors = []
        this.success = []
    }

    async validateFollow(operation) {
        if (this.data.authorId == this.data.followerId ) {
            this.errors.push(`You can not follow yourself.`)
            return false
        }
        if (typeof (this.data.authorId) != "string" || !ObjectId.isValid(this.data.authorId)) {
            return false
        } else {
            const resultUsers = await db.collection("users").findOne(ObjectId(this.data.authorId))
            if (resultUsers) {
                const resultfollowers = await db.collection("followers").findOne({ authorId: ObjectId(this.data.authorId), followerId: ObjectId(this.data.followerId) })
                if (operation == 'follow') {
                    if (!resultfollowers) {
                        return true
                    } else {
                        this.errors.push(`Already Following ${this.data.authorUsername}`)
                        return false
                    }
                } else {
                    if (resultfollowers) {
                        return true
                    } else {
                        this.errors.push(`Already not Following ${this.data.authorUsername}`)
                        return false
                    }
                }

            } else {
                this.errors.push(`${this.data.authorUsername} does not exists`)
                return false
            }
        }
    }

    async follow() {
        try {
            if (await this.validateFollow('follow')) {
                const registerFollower = await db.collection("followers").insertOne({ authorId: ObjectId(this.data.authorId), followerId: ObjectId(this.data.followerId) })
                this.success.push(`Successfully followed ${this.data.authorUsername}`)
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
            if (await this.validateFollow('unfollow')) {
                const removeFollower = await db.collection("followers").deleteOne({ authorId: ObjectId(this.data.authorId), followerId: ObjectId(this.data.followerId) })
                this.success.push(`Successfully remove following ${this.data.authorUsername}`)
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