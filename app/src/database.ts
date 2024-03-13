import mongoose, { ConnectOptions, Document, Model, Schema } from 'mongoose'

class Database {
    private uri: string
    private options: ConnectOptions

    constructor(uri: string) {
        this.uri = uri
        this.options = {}
    }

    public async connect(): Promise<void> {
        try {
            await mongoose.connect(this.uri, this.options)
            // console.log('Connected to MongoDB')
        } catch (error) {
            console.error('Error connecting to MongoDB:', error)
        }
    }

    public getModel<T extends Document>(name: string, schema: Schema): Model<T> {
        return mongoose.model<T>(name, schema)
    }

    public async disconnect(): Promise<void> {
        try {
            await mongoose.disconnect()
            // console.log('Disconnected from MongoDB')
        } catch (error) {
            console.error('Error disconnecting from MongoDB:', error)
        }
    }
}

export default Database