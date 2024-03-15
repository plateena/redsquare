import { Schema, model, Query } from 'mongoose'
import { Request } from 'express'
import { Document } from 'mongodb'

export interface IBaseModelOptions {
    query: (query: Request) => any
    allowedSorts?: string[]
    defaultSort?: string
    paginattion?: {
        perPage: number
    }
}

export interface ISearch<T> {
    status: string
    _filter?: any
    _options?: any
    data: Partial<T>[]
    total: number
}

// Model interface
export interface IBaseModel extends Document {
    search<T, R>(req: R): Promise<T>
    delete<T>(id: number | string): Promise<T[]>
    truncate<T>(): Promise<T>
}

function handleSort(query: Query<Document, Document>, urlQuery: any, options?: IBaseModelOptions): void {
    if (!options?.allowedSorts || !urlQuery?.sort) {
        if (options?.defaultSort) {
            query.sort(options.defaultSort)
        }
        return
    }

    const urlSort = urlQuery.sort
    const sorts = urlSort.split(',')

    for (const sort of sorts) {
        const cleanSort = sort.startsWith('-') ? sort.substring(1) : sort
        if (options.allowedSorts.includes(cleanSort)) {
            query.sort(cleanSort)
        }
    }
}

function handlePagination(query: Query<Document, Document>, urlQuery: any, options?: IBaseModelOptions): void {
    if (urlQuery?.page) {
        const page = urlQuery.page - 1
        let perPage = options?.paginattion?.perPage || 5

        if (urlQuery?.perPage) {
            perPage = parseInt(urlQuery.perPage)
        }

        query.limit(perPage).skip(page * perPage)
    }
}

function BaseModel<T>(modelName: string, schema: Schema, options?: IBaseModelOptions): IBaseModel {
    schema.statics.search = async function (urlQuery: any): Promise<ISearch<T>> {
        let filters = []
        if (options?.query) {
            filters = options.query(urlQuery)
        }

        let query = this.find(filters)

        handlePagination(query, urlQuery, options)
        handleSort(query, urlQuery, options)

        const data = await query
        return {
            status: 'success',
            _filter: JSON.stringify(query.getFilter()),
            _options: query.getOptions(),
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