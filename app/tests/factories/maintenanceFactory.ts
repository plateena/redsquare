import { Model, Types } from 'mongoose'
import BaseFactory from '@zainundin/mongoose-factory'
import { faker } from '@faker-js/faker'
import MaintenanceModel, { IMaintenance } from '../../src/models/Maintenance'
import { IVehicle } from '../../src/models/Vehicle'
import vehicleFactory from './vehicleFactory'

// Create a subclass of BaseFactory for your model
class MaintenanceFactory extends BaseFactory<IMaintenance> {
    constructor() {
        super(MaintenanceModel as unknown as Model<IMaintenance>)
    }

    // Implement the abstract definition method
    async definition(): Promise<IMaintenance> {
        return {
            vehicle: faker.database.mongodbObjectId() as unknown as Types.ObjectId,
            description: faker.lorem.paragraph(),
            date: faker.date.soon({ days: 200 }).toISOString() as unknown as Date,
            status: 'pending',
        }
    }
}

// Create an instance of YourModelFactory
const maintenanceFactory = new MaintenanceFactory()

export default maintenanceFactory