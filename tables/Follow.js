const sanitizeHTML = require('sanitize-html')
const ObjectId = require('mongodb').ObjectId

class Follow {
    constructor(data) {
        this.data = data
        this.errors = []
        this.success = []
    }

    async validate() {
        if (typeof (this.data.authorId) != "string" || !ObjectId.isValid(this.data.authorId)) {
            return false
        } else {
            const resultUsers = await db.collection("users").findOne(ObjectId(this.data.authorId))
            if (resultUsers) {
                const resultfollowers = await db.collection("followers").findOne({ authorId: this.data.authorId, followerId: this.data.followerId })
                if (!resultfollowers) {
                    return true
                } else {
                    this.errors.push(`Already Following ${this.data.authorUsername}`)
                    return false
                }
            } else {
                this.errors.push(`${this.data.authorUsername} does not exists`)
                return false
            }
        }
    }

    async register() {
        try {
            if (await this.validate()) {
                const registerFollower = await db.collection("followers").insertOne(this.data)
                this.success.push(`Successfully followed ${this.data.authorUsername}`)
                return registerFollower
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
        }

    }
}

module.exports = Follow