import Vehicle from '../../src/models/Vehicle'
import Database from '../../src/database'
import vehicleFactory from '../factories/vehicleFactory'
import VehicleModel, { IVehicle } from '../../src/models/Vehicle'
import { ISearch } from '../../src/models/BaseModel'
import { faker } from '@faker-js/faker'
import './../setup-db'

describe('Vehicle Model', () => {
    afterEach(async () => {
        // clean up vehicle document after test
        await VehicleModel.truncate()
    })

    it('can find model', async () => {
        await vehicleFactory.count(10).create()
        let rs = await Vehicle.find({})
        expect(rs.length).toEqual(10)
    })

    it('can retrive the Vehicle', async () => {
        let createdData = (await vehicleFactory.count(10).create()) as IVehicle[]

        let result: ISearch<IVehicle> = await Vehicle.search({
            page: 1,
            perPage: 10,
        })

        expect(result.data.length).toBe(10)
    })

    it('can sort vehicle list', async () => {
        let createdData = (await vehicleFactory.count(10).create()) as IVehicle[]
        let result: ISearch<IVehicle> = await Vehicle.search({
            sort: 'brand,-color',
        })

        // Extract colors from createdData
        const createdDataColors = createdData.map((vehicle) => vehicle.color)

        // Extract colors from result.data
        const resultDataColors = result.data?.map((vehicle) => vehicle.color )

        // Sort the arrays of colors
        createdDataColors.sort()

        // Verify that the sorted arrays of colors match
        expect(resultDataColors).toEqual(createdDataColors)
    })
})