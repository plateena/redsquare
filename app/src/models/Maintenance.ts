import { Schema, Types, Model } from 'mongoose'
import BaseModel, { IBaseModel, IBaseModelOptions } from './BaseModel'

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

const options: IBaseModelOptions = {
    allowedSorts: ['date'],
    defaultSort: '-date',
    populate: ['vehicle'],
    query: (query: any) => {
        const filters: any = {}
        if (query.filter) {
            for (const [key, value] of Object.entries(query.filter)) {
                if (key === 'vehicle' || key === 'status') {
                    if (!Array.isArray(filters[key])) {
                        filters[key] = []
                    }
                    filters[key].push(value)
                }
                if (key === 'vehiclePlateNumber') {
                    filters['vehicle'] = { $in: await Vehicle.find({ plateNumber: value }, '_id') }
                }
            }
        }
        return filters
    },
}

// Extend the Maintenance interface with IBaseModel
export interface IMaintenanceModel extends Model<IMaintenance>, IBaseModel {}

// Create the Maintenance model using the BaseModel
const MaintenanceModel = BaseModel<IMaintenance>('Maintenance', MaintenanceSchema, options) as IMaintenanceModel

// Export the Maintenance model
export default MaintenanceModel