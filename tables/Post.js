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
            if (typeof (this.data._id) != "string" || !ObjectId.isValid(this.data._id)) {
                return false
            }
            this.data = { _id: ObjectId(this.data._id) }
            const resultPost = await db.collection("posts").aggregate([
                { $match: this.data },
                { $lookup: { from: "users", localField: "author", foreignField: "_id", as: "docAuthor" } }
            ]).toArray()
            return resultPost[0]
        } catch (error) {
            console.log('Post not found')
        }
    }

    async profile() {
        try {
            if (typeof (this.data._id) != "string" || !ObjectId.isValid(this.data._id)) {
                return false
            }
            this.data = { _id: ObjectId(this.data._id) }
            const resultProfile = await db.collection("users").aggregate([
                { $match: this.data },
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

}

module.exports = Post
