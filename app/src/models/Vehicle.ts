import { Schema, model, Model } from 'mongoose'
import { BaseModel, IBaseModel } from './BaseModel'

// Define the interface for the Vehicle document
export interface IVehicle {
    plateNumber: string
    color: string
    brand: string
    model: string
    year: number
    // Add other fields as needed
}

// Define the schema for the Vehicle collection
export const VehicleSchema = new Schema<IVehicle>({
    plateNumber: { type: String, required: true },
    color: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    // Add other fields as needed
})

VehicleSchema.plugin(BaseModel, { parseFilters: parseFilters })

function parseFilters(query: any) {
    const filters: any = {}
    for (const key in query) {
        if (key.startsWith('filter[') && key.endsWith(']')) {
        }
    }
    return filters
}

// Export the Vehicle model
const Vehicle = model<IVehicle, IBaseModel>('Vehicle', VehicleSchema)


export default Vehicle