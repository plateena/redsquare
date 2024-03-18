import express from 'express'
import App from './app'
import Database from './database'

const app = express()
const port = 8000

const database = new Database('mongodb://mongodb:27017/redsquare_test')

database
    .connect()
    .then(() => {
        console.log('Database connected')
        const server = new App(database).app
        server.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    })
    .catch((error) => {
        console.error('Error connecting to database:', error)
    })