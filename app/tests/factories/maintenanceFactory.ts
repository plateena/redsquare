import { Model, Types, Schema } from 'mongoose'
import BaseFactory from '@zainundin/mongoose-factory'
import { faker } from '@faker-js/faker'
import MaintainanceModel, { IMaintenance } from '../../src/models/Maintainence'
import { IVehicle } from '../../src/models/Vehicle'
import vehicleFactory from './vehicleFactory'

// Create a subclass of BaseFactory for your model
class MaintenanceFactory extends BaseFactory<IMaintenance> {
    constructor() {
        super(MaintainanceModel as unknown as Model<IMaintenance>)
    }

    // Implement the abstract definition method
    async definition(): Promise<IMaintenance> {
        // Define the structure of your data here
        const vehicle = (await vehicleFactory.create()) as IVehicle

        return {
            vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle', _id: vehicle._id?.toString() },
            description: faker.lorem.paragraph(),
            date: faker.date.soon({ days: 200 }),
            status: 'pending',
        }
    }
}

// Create an instance of YourModelFactory
const maintenanceFactory = new MaintenanceFactory()

export default maintenanceFactory