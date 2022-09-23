class RegistrationForm {
    constructor() {
        this.registrationForm = document.querySelector('#registration-form')
        this.allFields = document.querySelectorAll("#registration-form .form-control")
        this.insertValidationElements()
        this.username = document.querySelector("#username-register")
        this.username.previousValue = ""
        this.email = document.querySelector("#email-register")
        this.email.previousValue = ""
        this.password = document.querySelector("#password-register")
        this.password.previousValue = ""
        this.events()
    }

    events() {
        this.username.addEventListener('keyup', () => {
            this.keyHandler(this.username, this.usernameHandler)
            this.username.im = "Allowed letters, numbers and up to 20 characters"
            this.username.af = "Must contain more than 4 characters"
        })

        this.email.addEventListener('keyup', () => {
            this.keyHandler(this.email, this.emailHandler)
            this.email.im = "Not a valid email or Length above 100 characters"
            this.email.af = "Must contain more than 10 characters"
        })

        this.password.addEventListener('keyup', () => {
            this.keyHandler(this.password, this.passwordHandler)
            this.password.im = "Letters, numbers, !@#_- and Length up to 50 characters"
            this.password.af = "Must contain more than 8 characters"
        })

        this.registrationForm.addEventListener('submit', (e) => {
            e.preventDefault()
            this.formSubmitHandler(this.username, this.email, this.password)
        })
    }

    // Individual methods
    usernameHandler() {
        this.username.error = false
        this.username.min = 4
        this.username.len = 20
        this.username.regex = new RegExp("[^a-zA-Z0-9]", "g")
        this.username.check = true
        this.immediately(this.username, this.username.regex, true)
        clearTimeout(this.username.timer)
        this.username.timer = setTimeout(() => this.afterDelay('username', this.username), 2000)
    }

    emailHandler() {
        this.email.error = false
        this.email.min = 10
        this.email.len = 100
        this.email.regex = new RegExp("\\S+@\\S+\\.\\S+", "g")
        this.email.check = true
        this.immediately(this.email, this.email.regex, false)
        clearTimeout(this.email.timer)
        this.email.timer = setTimeout(() => this.afterDelay('email', this.email), 2000)
    }

    passwordHandler() {
        this.password.error = false
        this.password.min = 8
        this.password.len = 50
        this.password.regex = new RegExp("[^a-zA-Z0-9!@#_\-]", "g")
        this.password.check = false
        this.immediately(this.password, this.password.regex, true)
        clearTimeout(this.password.timer)
        this.password.timer = setTimeout(() => this.afterDelay('password', this.password), 2000)
    }

    // Common methods
    formSubmitHandler(usr, email, pass) {
        if (!usr.value && !email.value && !pass.value) {
            alertExit('Invalid Registration Data', 'Click [Exit] button', 'error', 'Exit', true)
        } else {
            if (!usr.error && !email.error && !pass.error) {
                alertMsg('Are you sure ?', 'Click [Ok] button to Sign Up.', 'success', true, false, this.registrationForm.id)
            } else {
                alertExit('Invalid Registration Data', 'Click [Exit] button', 'error', 'Exit', true)
            }
        }
    }

    keyHandler(el, handler) {
        if (el.value != el.previousValue) {
            handler.call(this)
            el.previousValue = el.value
        }
    }

    immediately(el, regex, bool) {
        if (el.value != "" && regex.test(el.value) == bool || el.value.length > el.len) {
            this.showError(el, el.im)
        }
        if (!el.error) {
            this.hideError(el)
        }
    }

    async afterDelay(lbl, el) {
        if (el.value != "" && el.value.length <= el.min) {
            this.showError(el, el.af)
        } else {
            if (el.check) {
                let result = await this.sendRequest(lbl, el)
                if (result == el.value && result != '') {
                    this.showError(el, `${result} already taken.`)
                }
            }
        }
        if (!el.error) {
            this.hideError(el)
        }
    }

    hideError(el) {
        let elMsg = el.previousElementSibling
        elMsg.innerHTML = ''
        if (elMsg.classList.contains("liveValidateMessage--visible")) {
            elMsg.classList.remove("liveValidateMessage--visible")
        }
    }

    showError(el, msg) {
        let elMsg = el.previousElementSibling
        elMsg.innerHTML = msg
        if (!elMsg.classList.contains("liveValidateMessage--visible")) {
            elMsg.classList.add("liveValidateMessage--visible")
        }
        el.error = true
    }

    insertValidationElements() {
        this.allFields.forEach((el) => {
            el.insertAdjacentHTML('beforebegin', '<div class="alert alert-danger small liveValidateMessage w-100 text-center"></div>')
        })
    }

    async sendRequest(lbl, el) {
        let obj = {}
        obj[lbl] = el.value
        let response = await axios.post(`/users-validation`, obj)
        if (response.data.length) {
            return response.data[0][lbl]
        } else {
            return ''
        }
    }

}