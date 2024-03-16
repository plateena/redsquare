import { Schema, Types, Model, PopulatedDoc } from 'mongoose'
import BaseModel, { IBaseModel, IBaseModelOptions } from './BaseModel'
import { IVehicle } from './Vehicle' // Assuming the Vehicle model is imported here

// Define the interface for the Maintenance document
export interface IMaintenance {
    vehicle: Types.ObjectId | Record<string, unknown>
    description: string
    date: Date
    _id?: Types.ObjectId

}

// Define the schema for the Maintenance collection
export const MaintenanceSchema = new Schema<IMaintenance>({
    vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    // Add other fields as needed
})

// Define options for the BaseModel
const options: IBaseModelOptions = {
    allowedSorts: ['date'],
    defaultSort: '-date', // Default sorting by date in descending order
    query: (query: any) => {
        // Implement query logic if needed
        // This can be similar to what you have in the Vehicle model
        return {}
    },
}

// Extend the Maintenance interface with IBaseModel
export interface IMaintenanceModel extends Model<IMaintenance>, IBaseModel {}

// Create the Maintenance model using the BaseModel
const MaintenanceModel = BaseModel<IMaintenance>('Maintenance', MaintenanceSchema, options) as IMaintenanceModel

// Export the Maintenance model
export default MaintenanceModel