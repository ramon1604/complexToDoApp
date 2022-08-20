// Load enviroment variables
const dotenv = require('dotenv')
dotenv.config()

// Connect mongodb
const { MongoClient } = require('mongodb')
const connectDb = () => {
    return new Promise((resolve, reject) => {
        const client = new MongoClient(process.env.CONNECTIONSTRING)
        client.connect().then(() => {
            resolve(client.db())
        }).catch((error) => {
            reject(error)
        })
    })
}
connectDb().then((connectionDb) => {
    global.db = connectionDb
}).catch((error) =>{
    console.log(error)
}) 


// Define appRoot  
const path = require('path')
global.appRoot = path.resolve(__dirname)
