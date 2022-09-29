// Middleware
const bcrypt = require('bcryptjs')

class apiUser {
    constructor(data) {
        this.data = data
    }

    async login() {
        try {
            const resultUser = await db.collection("users").findOne({ username: this.data.username })
            if (bcrypt.compareSync(this.data.password, resultUser.password)) {
                return resultUser
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = apiUser