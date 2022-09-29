const bcrypt = require('bcryptjs')
const ObjectId = require('mongodb').ObjectId
const sanitizeHTML = require('sanitize-html')

class apiPost {
    constructor(data) {
        this.data = data
    }

    cleanBogus() {
        if (this.data.author) { this.data.author = new ObjectId(this.data.author) }
        this.data.title = sanitizeHTML(this.data.title.trim())
        this.data.body = sanitizeHTML(this.data.body.trim())
        this.data.createdDate = new Date()
    }

    async create() {
        try {
            this.cleanBogus()
            const insertedPost = await db.collection("posts").insertOne(this.data)
            return insertedPost
        } catch (error) {
            return error
        }
    }
}

module.exports = apiPost