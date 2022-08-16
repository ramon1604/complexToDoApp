const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('home-guest')
})

let port = process.env.PORT
if (port == null || port == "") {
  port = 3000  
}
app.listen(port)