// Load enviroment variables
const dotenv = require('dotenv')
dotenv.config()

// Define appRoot  
const path = require('path')
global.appRoot = path.resolve(__dirname)

// Connect mongodb and create indexes
const { MongoClient } = require('mongodb')
global.client = new MongoClient(process.env.CONNECTIONSTRING)
let connectDb = (async () => {
  await client.connect()
  global.db = await client.db()
})().then(async () => {
  await db.collection("posts").createIndex({ title: "text", body: "text" })
  const indexes = await db.collection("posts").indexes()
  //console.log(indexes)
})

// Globals for Posts, followers and followings
global.rgbPosts = []
global.rgbFollowers = []
global.rgbFollowings = []

//Load session from MongoDb
const session = require('express-session')
const MongoStore = require('connect-mongo')
global.sessionOptions = session({
  secret: 'this is my secret',
  store: MongoStore.create({ client: client }),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true }
})

// Load Flash
const flash = require('connect-flash')
global.flashOpts = flash()
