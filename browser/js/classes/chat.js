class Chat {
    constructor() {
        this.csrf = csrf
        this.openedYet = false
        this.chatWrapper = document.querySelector("#chat-wrapper")
        this.injectHTML()
        this.chatLog = document.querySelector("#chat")
        this.chatField = document.querySelector("#chatField")
        this.chatForm = document.querySelector("#chatForm")
        this.chatIcon = document.querySelector(".header-chat-icon")
        this.chatIconClose = document.querySelector(".chat-title-bar-close")
        this.events()
    }

    events() {
        this.chatForm.addEventListener('submit', (e) => {
            e.preventDefault()
            this.sendMessageToServer()

        })
        this.chatIcon.addEventListener('click', () => this.showHideChat())
        this.chatIconClose.addEventListener('click', () => this.hideChat())
    }

    sendMessageToServer() {
        if (this.chatField.value) {
            this.msgFromBrowser()
            this.socket.emit('chatMsgFromBrowser', { message: this.chatField.value })
            this.chatField.value = ''
            this.chatField.focus()
        }
    }

    injectHTML() {
        this.chatWrapper.innerHTML = `
        <div class="chat-title-bar">Chat <span class="chat-title-bar-close"><i class="fas fa-times-circle"></i></span></div>
        <div id="chat" class="chat-log"></div>
        <form id="chatForm" class="chat-form border-top">
        <input type="hidden" name="_csrf" value="${this.csrf}" >
        <input type="text" class="chat-field" id="chatField" placeholder="Type a message…" autocomplete="off">
        </form>
        `
    }

    openConnection() {
        this.socket = io()
        this.socket.on('loggedUser', loggedUser => {
            this.loggedUser = loggedUser
        })
        this.socket.on('chatMsgFromServer', data => {
            this.msgFromServer(data)
        })
    }

    msgFromBrowser() {
        this.chatLog.insertAdjacentHTML('beforeend', DOMPurify.sanitize(`
        <div class="chat-self">
        <div class="chat-message">
          <div class="chat-message-inner">
            ${this.chatField.value}
          </div>
        </div>
        <strong class="ml-1">${this.loggedUser.username}</strong>
        <img class="chat-avatar avatar-tiny" src="https://gravatar.com/avatar/${this.loggedUser.avatar}?s=128">
      </div>
        `))
        this.chatLog.scrollTop = this.chatLog.scrollHeight
    }

    msgFromServer(data) {
        this.chatLog.insertAdjacentHTML('beforeend', DOMPurify.sanitize(`
        <div class="chat-other">
        <a href="/profile-posts/${data.user._id}/myPosts"><img class="avatar-tiny" src="https://gravatar.com/avatar/${data.user.avatar}?s=128"></a>
        <div class="chat-message"><div class="chat-message-inner">
          <a href="/profile-posts/${data.user._id}/myPosts"><strong>${data.user.username}:</strong></a>
          ${data.message}
        </div></div>
      </div>
        `))
        this.chatLog.scrollTop = this.chatLog.scrollHeight
    }

    showHideChat() {
        if (!this.chatWrapper.classList.contains("chat--visible")) {
            if (!this.openedYet) {
                this.openConnection()
                this.openedYet = true
            }
            this.chatWrapper.classList.add("chat--visible")
            this.chatField.focus()
        } else {
            this.chatWrapper.classList.remove("chat--visible")
        }
    }

    hideChat() {
        if (this.chatWrapper.classList.contains("chat--visible")) {
            this.chatWrapper.classList.remove("chat--visible")
        }
    }
}
