class RegistrationForm {
    constructor() {
        this.allFields = document.querySelectorAll("#registration-form .form-control")
        this.insertValidationElements()
        this.username = document.querySelector("#username-register")
        this.username.previousValue = ""
        this.errors = []
        this.events()
    }

    events() {
        this.username.addEventListener('keyup', () => {
            this.keyHandler(this.username, this.usernameHandler)
        })
    }

    keyHandler(el, handler) {
        if (el.value != el.previousValue) {
            handler.call(this)
            el.previousValue = el.value
        }
    }

    usernameHandler() {
        this.errors.usernameIm = this.usernameImmediately()
        clearTimeout(this.username.timer)
        this.username.timer = setTimeout(() => this.errors.usernameAf = this.usernameAfterDelay(), 1000)
    }

    usernameImmediately() {
        if (this.username.value != "" && /[^a-zA-Z0-9]+/g.test(this.username.value) || this.username.value.length > 20) {
            return this.showError(this.username, "Allowed letters, numbers and up to 20 characters")
        } else {
            return this.hideError(this.username)
        }
    }

    usernameAfterDelay() {
        if (this.errors.usernameIm) { return false }
        if (this.username.value != "" && this.username.value.length <= 4) {
            return this.showError(this.username, "Must contain more than 4 characters")
        } else {
            return this.hideError(this.username)
        }
    }

    hideError(el) {
        let elMsg = el.previousElementSibling
        elMsg.innerHTML = ''
        if (elMsg.classList.contains("liveValidateMessage--visible")) {
            elMsg.classList.remove("liveValidateMessage--visible")
        }
        return false
    }

    showError(el, msg) {
        let elMsg = el.previousElementSibling
        elMsg.innerHTML = msg
        if (!elMsg.classList.contains("liveValidateMessage--visible")) {
            elMsg.classList.add("liveValidateMessage--visible")
        }
        return true
    }

    insertValidationElements() {
        this.allFields.forEach((el) => {
            el.insertAdjacentHTML('beforebegin', '<div class="alert alert-danger small liveValidateMessage w-100 text-center"></div>')
        })
    }

}