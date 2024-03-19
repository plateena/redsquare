import { Schema, Types, Model, PopulatedDoc } from 'mongoose'
import BaseModel, { IBaseModel, IBaseModelOptions } from './BaseModel'
import { IVehicle } from './Vehicle' // Assuming the Vehicle model is imported here

// Define the interface for the Maintenance document
export interface IMaintenance {
    vehicle: Types.ObjectId | Record<string, unknown>
    description: string
    date: Date
    status: string
    _id?: Types.ObjectId
}

// Define the schema for the Maintenance collection
export const MaintenanceSchema = new Schema<IMaintenance>({
    vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending',
    },
})

// Define options for the BaseModel
const options: IBaseModelOptions = {
    allowedSorts: ['date'],
    defaultSort: '-date', // Default sorting by date in descending order
    populate: ['vehicle'],
    query: (query: any) => {
        const filters: any = {}
        console.log({query})
        for (const key in query) {
            console.log({key})
            if (key.startsWith('filter[') && key.endsWith(']')) {
                const field = key.substring(7, key.length - 1) // Extract field name from filter[field] format
                const value = query[key]
                console.log({field,value})
                if (field === 'vehicle') {
                    filters[field] = value
                }
            }
        }
        console.log('filter in model',filters)
        return filters
    },
}

// Extend the Maintenance interface with IBaseModel
export interface IMaintenanceModel extends Model<IMaintenance>, IBaseModel {}

// Create the Maintenance model using the BaseModel
const MaintenanceModel = BaseModel<IMaintenance>('Maintenance', MaintenanceSchema, options) as IMaintenanceModel

// Export the Maintenance model
export default MaintenanceModel