import express, { Application, Request, Response } from 'express'
import Database from './database'
import mongoose, { Document, Schema } from 'mongoose'
import apiRoutes from './route/api'

class App {
    public app: Application
    private database: Database | undefined = undefined

    constructor(database?: Database) {
        this.app = express()
        if (database) {
            this.database = database
        }
        this.configureMiddleware()
        this.configureRoutes()
    }

    private configureMiddleware(): void {
        this.app.use(express.json())
    }

    private configureRoutes(): void {
        this.app.get('/', (req: Request, res: Response) => {
            res.send('Welcome to the Courier Service App!')
        })

        this.app.use('/api/v1', apiRoutes)
    }

    public getApp(): Application {
        return this.app
    }
}

export default App