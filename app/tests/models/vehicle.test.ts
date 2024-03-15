import Vehicle from '../../src/models/Vehicle'
import Database from '../../src/database'
import vehicleFactory from '../factories/vehicleFactory'
import VehicleModel, { IVehicle } from '../../src/models/Vehicle'
import { ISearch } from '../../src/models/BaseModel'
import { faker } from '@faker-js/faker'

const database = new Database('mongodb://mongodb:27017')

describe('Vehicle Model', () => {
    beforeAll(async () => {
        await database.connect()
        await VehicleModel.truncate()
    })

    afterAll(async () => {
        await database.disconnect()
    })
    it('can retrive the Vehicle', async () => {
        let createdData = (await vehicleFactory.count(10).create()) as IVehicle[]
        // console.log(createdData[2])
        let result: ISearch<IVehicle> = await Vehicle.search({
            page: 1,
            perPage: 10,
        })

        console.log(result)
        expect(result.data.length).toBe(10)
        expect(result.data[0].plateNumber).toBe((createdData as IVehicle[])[0].plateNumber)
    })
})