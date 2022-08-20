const validator = require('validator')

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

User.prototype.validate = function () {
    if (this.data.username == "") { this.errors.push('Username required.') }
    if (this.data.username != "" && !validator.isAlphanumeric(this.data.username)) { this.errors.push('Username may only contain letters and numbers.') }
    if (!validator.isEmail(this.data.email)) { this.errors.push('Valid email required.') }
    if (this.data.password == "") { this.errors.push('Password required.') }
    if (this.data.password > 0 && this.data.password <= 8) { this.errors.push('Password must be greater than 8 characters.') }
    if (this.data.password > 30) { this.errors.push('Password can not exceed 30 characters and contain letters and numbers.') }
    if (this.data.username > 0 && this.data.username <= 4) { this.errors.push('Username must be greater than 4 characters.') }
    if (this.data.username > 20) { this.errors.push('Username can not exceed 20 characters.') }
}

User.prototype.register = function () {
    return new Promise((resolve, reject) => {
        this.cleanUp()
        this.validate()
        if (!this.errors.length) {
            db.collection("users").findOne({ username: this.data.username }).then((user) => {
                if (!user) {
                    db.collection("users").insertOne(this.data).then((inserted) => {
                        resolve("Registration successful.")
                    }).catch((error) => {
                        reject(error)
                    })
                } else {    
                    reject("Username already exists.")
                }
            }).catch((error) => { reject(error) })
        } else {
            reject("Validation errors encountered.")
        }
    })
}

User.prototype.login = function () {
    return new Promise((resolve, reject) => {
        this.cleanUp()
        db.collection("users").findOne({ username: this.data.username, password: this.data.password }, (err, user) => {
            if (!user) {
                reject("Login failed.")
            } else {
                resolve("Login successful.")
            }
        })
    })
}

module.exports = User