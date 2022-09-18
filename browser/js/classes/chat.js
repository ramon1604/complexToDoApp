class Chat {
    constructor() {
        this.openedYet = false
        this.chatWrapper = document.querySelector("#chat-wrapper")
        this.injectHTML()
        this.chatIcon = document.querySelector(".header-chat-icon")
        this.chatIconClose = document.querySelector(".chat-title-bar-close")
        this.events()
    }

    events() {
        this.chatIcon.addEventListener('click', () => this.showHideChat())
        this.chatIconClose.addEventListener('click', () => this.hideChat())
    }

    injectHTML() {
        this.chatWrapper.innerHTML = `
        <div class="chat-title-bar">Chat <span class="chat-title-bar-close"><i class="fas fa-times-circle"></i></span></div>
        <div id="chat" class="chat-log"></div>
        <form id="chatForm" class="chat-form border-top">
        <input type="text" class="chat-field" id="chatField" placeholder="Type a message…" autocomplete="off">
        </form>
        `
    }

    openConnection() {

    }    

    showHideChat() {
        if (!this.chatWrapper.classList.contains("chat--visible")) {
            if (!this.openedYet) {
                this.openConnection()
                this.openedYet = true
            }
            this.chatWrapper.classList.add("chat--visible")
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
