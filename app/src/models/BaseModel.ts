import { Schema, model, Query } from 'mongoose'
import { Request } from 'express'
import { Document } from 'mongodb'
import appConfig from '../config/app'

export interface IBaseModelOptions {
    query: (query: Request) => any
    allowedSorts?: string[]
    defaultSort?: string
    populate?: string[]
    pagination?: {
        perPage: number
    }
}

export interface IPagination {
    page: number
    perPage: number
    total: number
    lastPage: number
}

export interface ISearch<T> {
    status: string
    _filter?: any
    _options?: any
    data: Partial<T>[]
    total: number
    pagination?: IPagination
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
            query.sort(sort)
        }
    }
}

async function handlePagination(query: Query<Document, Document>, totalQuery: Query<Document, Document>, urlQuery: any, options?: IBaseModelOptions): Promise<IPagination> {
        const total = await totalQuery.countDocuments()
    if (urlQuery?.page) {
        const page = urlQuery.page - 1
        let perPage = options?.pagination?.perPage || 5

        if (urlQuery?.perPage) {
            perPage = parseInt(urlQuery.perPage)
        }

        const totalPages = Math.ceil(total / perPage);

        const pagination: IPagination = {
            page: page,
            perPage: perPage,
            total: total,
            lastPage: totalPages,
        }

        query.limit(perPage).skip(page * perPage)

        return pagination
    }

    return {
        page: 0,
        perPage: 0,
        total: total,
        lastPage: 0
    }
}

function handlePopulate(query: Query<Document, Document>, urlQuery: any, options?: IBaseModelOptions): void {
    if (!urlQuery?.populate || !options?.populate) return

    const allowedPopulates = options.populate
    const requestedPopulates = urlQuery.populate.split(',')
    const validPopulates = requestedPopulates.filter((populate: string) => allowedPopulates.includes(populate))

    query.populate(validPopulates)
}

function BaseModel<T>(modelName: string, schema: Schema, options?: IBaseModelOptions): IBaseModel {
    schema.statics.search = async function (urlQuery: any): Promise<any> {
        let filters = {}
        let perPage = urlQuery.perPage || appConfig.pagination.per_page
        if (options?.query) {
            filters = options.query(urlQuery)
        }

        let query = this.find(filters)
        let totalQuery = this.find(filters)

        handlePopulate(query, urlQuery, options)
        let pagination: IPagination = await handlePagination(query, totalQuery, urlQuery, options)
        handleSort(query, urlQuery, options)

        const data = await query.exec()

        return {
            status: 'success',
            _filter: JSON.stringify(query.getFilter()),
            _options: query.getOptions(),
            data,
            pagination,
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