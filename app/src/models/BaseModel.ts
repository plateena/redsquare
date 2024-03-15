import { Schema, Model, model, Document } from 'mongoose'
import { Request } from 'express'

export interface IBaseModelOptions {
    query: (query: Request) => any
    sort: (query: Request) => any
}

export interface ISearch<T> {
    status: string
    _filter?: any
    data: Partial<T>[]
    total: number
}

// Model interface
export interface IBaseModel extends Document {
    search<T, R>(req: R): Promise<T>
    delete<T>(id: number | string): Promise<T[]>
    truncate<T>(): Promise<T>
}

function BaseModel<T>(modelName: string, schema: Schema, options?: IBaseModelOptions): Model<T & IBaseModel> {
    schema.statics.search = async function (urlQuery: any): Promise<ISearch<T>> {
        let filters = []
        if (options?.query) {
            filters = options.query(urlQuery)
        }

        const query = this.find(filters)

        if (urlQuery?.page) {
            const page = urlQuery.page - 1
            let perPage = 5

            if (urlQuery?.perPage) {
                perPage = parseInt(urlQuery.perPage)
            }

            query.limit(perPage).skip(page)
        }

        if (options?.sort) {
            query.sort({ plateNumber: -1 })
        }
        const data = await query
        return {
            status: 'success',
            _filter: JSON.stringify(query.getFilter()),
            data,
            total: data.length,
        }
    }

    schema.statics.truncate = async function (): Promise<{ status: string; error?: any }> {
        try {
            await this.deleteMany({})
            return { status: 'success' }
        } catch (error) {
            return { status: 'error', error }
        }
    }

    const theModel = model<T, IBaseModel>(modelName, schema)

    return theModel
}

export default BaseModel