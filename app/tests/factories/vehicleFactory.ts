import { Model } from 'mongoose'
import BaseFactory from '@zainundin/mongoose-factory'
import { faker } from '@faker-js/faker'
import VehicleModel, { IVehicle, VehicleSchema } from '../../src/models/Vehicle'

// Create a subclass of BaseFactory for your model
class VehicleFactory extends BaseFactory<IVehicle> {
    constructor() {
        super(VehicleModel as unknown as Model<IVehicle>)
    }

    // Implement the abstract definition method
    async definition(): Promise<IVehicle> {
        // Define the structure of your data here
        const Condition =  ['poor', 'fair', 'average', 'good', 'great']
        return {
            plateNumber: faker.vehicle.vrm(),
            color: faker.vehicle.color(),
            brand: faker.vehicle.manufacturer(),
            model: faker.vehicle.model(),
            year: faker.number.int({ max: 2022, min: 1980 }),
            status: faker.helpers.arrayElement(Condition) as unknown as string,
        }
    }
}

// Create an instance of YourModelFactory
const vehicleFactory = new VehicleFactory()

export default vehicleFactory