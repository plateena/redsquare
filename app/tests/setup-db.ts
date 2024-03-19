import Database from '../src/database'

const database = new Database('mongodb://mongodb:27017/redsquare_test')

// Before all tests, connect to the database
beforeAll(async () => {
    await database.connect()
})

// After all tests, disconnect from the database
afterAll(async () => {
    await database.disconnect()
})