class Search {
    constructor() {
        this.headerSearchIcon = document.querySelector('.header-search-icon')
        this.events()
    }

    events() {
        this.headerSearchIcon.addEventListener('click', (e) => {
            e.preventDefault()
            this.openOverlay()
        })
    }

    openOverlay() {
        alert("This is a Search class test")
    }
}
