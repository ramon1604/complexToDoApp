// Load enviroment variables
const dotenv = require('dotenv')
dotenv.config()

// Connect mongodb
const {MongoClient} = require('mongodb')
let connectDb = async () => {
    const client = new MongoClient(process.env.CONNECTIONSTRING)
    await client.connect()
    global.db = client.db()
}
connectDb()

// Define appRoot  
const path = require('path')
global.appRoot = path.resolve(__dirname)
