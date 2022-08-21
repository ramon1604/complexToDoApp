// Load enviroment variables
const dotenv = require('dotenv')
dotenv.config()

// Connect mongodb
const { MongoClient } = require('mongodb')
const client = new MongoClient(process.env.CONNECTIONSTRING)
const connectDb = async () => {
    try {
        await client.connect()
        global.db = client.db()
    } catch (error) {
        console.log(error)
    }
}
connectDb()


// Define appRoot  
const path = require('path')
global.appRoot = path.resolve(__dirname)
