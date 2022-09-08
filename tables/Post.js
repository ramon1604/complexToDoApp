const sanitizeHTML = require('sanitize-html')
const ObjectId = require('mongodb').ObjectId
class Post {
    constructor(data) {
        this.data = data
        this.errors = []
        this.success = []
    }
    cleanUp() {
        if (typeof (this.data.title) != "string") { this.data.title = "" }
        if (typeof (this.data.body) != "string") { this.data.body = "" }
    }

    cleanBogus() {
        if (this.data._id) { this.data._id = new ObjectId(this.data._id) }
        if (this.data.author) { this.data.author = new ObjectId(this.data.author) }
        this.data.title = sanitizeHTML(this.data.title.trim())
        this.data.body = sanitizeHTML(this.data.body.trim())
        this.data.createdDate = new Date()
    }

    async validate() {
        if (this.data.title == "") { this.errors.push('Title required.') }
        if (this.data.body == "") { this.errors.push('Body required.') }
    }

    validId() {
        if (typeof (this.data._id) != "string" || !ObjectId.isValid(this.data._id)) {
            return false
        } else {
            return true
        }
    }

    async save() {
        try {
            this.cleanUp()
            this.cleanBogus()
            await this.validate()
            if (!this.errors.length) {
                const insertedPost = await db.collection("posts").insertOne(this.data)
                if (insertedPost) { this.success.push('New post successfully created.') }
                return insertedPost
            } else {
                return false
            }
        } catch (error) {
            console.log('Could not save post')
        }
    }

    async view() {
        try {
            if (!this.validId()) { return false }
            const resultPost = await db.collection("posts").aggregate([
                { $match: { _id: ObjectId(this.data._id) } },
                { $lookup: { from: "users", localField: "author", foreignField: "_id", as: "docAuthor" } }
            ]).toArray()
            return resultPost[0]
        } catch (error) {
            console.log('Post not found')
        }
    }

    async profile() {
        try {
            if (!this.validId()) { return false }
            const resultProfile = await db.collection("users").aggregate([
                { $match: { _id: ObjectId(this.data._id) } },
                {
                    $lookup: {
                        from: "posts", localField: "_id", foreignField: "author", as: "docsAuthor", pipeline:
                            [{ $sort: { createdDate: -1 } }]
                    }
                }
            ]).toArray()
            return resultProfile[0]
        } catch (error) {
            console.log('Post not found')
        }
    }

    async edit() {
        try {
            if (!this.validId()) { return false }
            const resultPost = await db.collection("posts").findOne(ObjectId(this.data._id))
            return resultPost
        } catch (error) {
            console.log('Post not found')
        }
    }

    async update() {
        try {
            if (!this.validId()) { return false }
            this.cleanBogus()
            const resultPost = await db.collection("posts").updateOne({ _id: this.data._id, author: this.data.author }, { $set: { title: this.data.title, body: this.data.body, createdDate: this.data.createdDate } })
            if (resultPost.modifiedCount) {
                this.success.push('Updates were successful')
            } else {
                this.errors.push('Operation not allowed')
            }
            return resultPost
        } catch (error) {
            console.log('Post not found')
        }
    }

    async delete() {
        try {
            if (!this.validId()) { return false }
            const resultPost = await db.collection("posts").deleteOne({ _id: ObjectId(this.data._id), author: ObjectId(this.data.author) })
            if (resultPost.deletedCount) {
                this.success.push('Post deleted successfully.')
            } else {
                this.errors.push('Operation not allowed')
            }
            return resultPost
        } catch (error) {
            console.log('Post not found')
        }
    }

}

module.exports = Post
