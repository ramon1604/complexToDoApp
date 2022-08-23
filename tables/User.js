// Middleware
const validator = require('validator')
const bcrypt = require('bcryptjs')

let User = function (data) {
    this.data = data
    this.errors = []
}

User.prototype.cleanUp = function () {
    if (typeof (this.data.username) != "string") { this.data.username = "" }
    if (typeof (this.data.email) != "string") { this.data.email = "" }
    if (typeof (this.data.password) != "string") { this.data.password = "" }

    // get rid of any bogus properties
    this.data = {
        username: this.data.username.trim().toLowerCase(),
        email: this.data.email.trim().toLowerCase(),
        password: this.data.password
    }
}

User.prototype.validate = async function () {
    if (this.data.username == "") { this.errors.push('Username required.') }
    if (this.data.username != "" && !validator.isAlphanumeric(this.data.username)) { this.errors.push('Username may only contain letters and numbers.') }
    if (!validator.isEmail(this.data.email)) { this.errors.push('Valid email required.') } 
    if (this.data.password == "") { this.errors.push('Password required.') }
    if (this.data.password.length > 0 && this.data.password.length <= 8) { this.errors.push('Password must be greater than 8 characters.') }
    if (this.data.password.length > 30) { this.errors.push('Password can not exceed 30 characters and contain letters and numbers.') }
    if (this.data.username.length > 0 && this.data.username.length <= 4) { this.errors.push('Username must be greater than 4 characters.') }
    if (this.data.username.length > 20) { this.errors.push('Username can not exceed 20 characters.') }
    if (!this.errors.length) {
        const userExists = await db.collection("users").findOne({ username: this.data.username })
        if (userExists) { this.errors.push('Username already taken.') }
        const emailExists = await db.collection("users").findOne({ email: this.data.email })
        if (emailExists) { this.errors.push('Email already taken.') }

    }

}

User.prototype.register = async function () {
    try {
        this.cleanUp()
        await this.validate()
        if (!this.errors.length) {
            let salt = bcrypt.genSaltSync(10)
            this.data.password = bcrypt.hashSync(this.data.password, salt)
            const insertedUser = await db.collection("users").insertOne(this.data)
            return insertedUser
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
    }
}

User.prototype.login = async function () {
    try {
        this.cleanUp()
        const resultUser = await db.collection("users").findOne({ username: this.data.username })
        if (bcrypt.compareSync(this.data.password, resultUser.password)) {
            return resultUser
        } else {
            this.errors.push('Invalid Username / Password');
            return false
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = User