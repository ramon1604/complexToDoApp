const ObjectId = require('mongodb').ObjectId
class Post {
    constructor(data) {
        this.data = data
        this.errors = []
    }
    cleanUp() {
        if (typeof (this.data.title) != "string") { this.data.title = "" }
        if (typeof (this.data.body) != "string") { this.data.body = "" }

        // get rid of any bogus properties
        this.data = {
            author: ObjectId(this.data.userId),
            title: this.data.title.trim().toUpperCase(),
            body: this.data.body.trim(),
            createdDate: new Date()
        }
    }
    async validate() {
        if (this.data.title == "") { this.errors.push('Title required.') }
        if (this.data.body == "") { this.errors.push('Body required.') }
    }
    async save() {
        try {
            this.cleanUp()
            await this.validate()
            if (!this.errors.length) {
                const insertedPost = await db.collection("posts").insertOne(this.data)
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
            this.data = { _id: ObjectId(this.data._id) }
            const resultPost = await db.collection("posts").findOne(this.data)
            return resultPost
        } catch (error) {
            console.log('Post not found')
        }
    }
}

module.exports = Post
