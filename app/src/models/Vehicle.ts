import { Schema, Types } from 'mongoose'
import BaseModel, { IBaseModelOptions } from './BaseModel'

// Define the interface for the Vehicle document
export interface IVehicle {
    plateNumber: string
    color: string
    brand: string
    model: string
    year: number
    maintenance?: Types.ObjectId | Record<string, unknown>
    _id?: Types.ObjectId
};;

// Define the schema for the Vehicle collection
export const VehicleSchema = new Schema<IVehicle>({
    plateNumber: { type: String, required: true },
    color: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    maintenance: { type: Schema.Types.ObjectId, ref: 'Maintenance', required: false },
    // Add other fields as needed
})

const options: IBaseModelOptions = {
    allowedSorts: ['color', 'plateNumber'],
    defaultSort: 'plateNumber',
    query: (query: any) => {
        const filters: any = {}
        for (const key in query) {
            if (key.startsWith('filter[') && key.endsWith(']')) {
                const field = key.substring(7, key.length - 1) // Extract field name from filter[field] format
                const value = query[key]
                if (field === 'color') {
                    filters[field] = { $regex: new RegExp(value), $options: 'i' } // Treat symbol as regex filter
                }
                if (field === 'brand') {
                    filters[field] = { $regex: new RegExp(value), $options: 'i' } // Treat symbol as regex filter
                }
            }
        }

        return filters
    },
}

export default BaseModel<IVehicle>('Vehicle', VehicleSchema, options)