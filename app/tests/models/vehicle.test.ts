import Vehicle from '../../src/models/Vehicle'
import Database from '../../src/database'
import vehicleFactory from '../factories/vehicleFactory'
import VehicleModel, { IVehicle } from '../../src/models/Vehicle'
import { ISearch } from '../../src/models/BaseModel'
import { faker } from '@faker-js/faker'
import './../setup-db'

describe('Vehicle Model', () => {
    beforeEach(async () => {
        // clean up vehicle document after test
        await VehicleModel.truncate()
    })

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
            sort: 'color',
        })

        // Extract colors from createdData
        const createdDataColors = createdData.map((vehicle) => vehicle.color)

        // Extract colors from result.data
        const resultDataColors = result.data?.map((vehicle) => vehicle.color)

        // Sort the arrays of colors
        createdDataColors.sort()

        // Verify that the sorted arrays of colors match
        expect(resultDataColors).toEqual(createdDataColors)
    })

    it('can add vehilcle', async () => {
        const mockData = await vehicleFactory.make()
        const result = await Vehicle.create(mockData)

        expect(result).toEqual(expect.objectContaining(result))
    })

    it('can edit vehicle', async () => {
        // Create a new vehicle and retrieve its ID
        const mockData = (await vehicleFactory.create()) as IVehicle
        const vehicleId = mockData._id?.toString()

        // Find the vehicle by its ID
        const foundVehicle = await Vehicle.findById(vehicleId)

        // Ensure that the vehicle was found
        expect(foundVehicle).toBeDefined()

        // Modify the properties of the found vehicle
        foundVehicle!.color = 'edit-' + foundVehicle!.color
        foundVehicle!.brand = 'edit-' + foundVehicle!.brand
        foundVehicle!.model = 'edit-' + foundVehicle!.model

        // Save the changes to the database
        await foundVehicle!.save()

        // Retrieve the updated vehicle from the database
        const updatedVehicle = await Vehicle.findById(vehicleId)

        // Verify that the properties of the updated vehicle match the modified values
        expect(updatedVehicle!.color).toEqual('edit-' + mockData.color)
        expect(updatedVehicle!.brand).toEqual('edit-' + mockData.brand)
        expect(updatedVehicle!.model).toEqual('edit-' + mockData.model)
    })

    it('can delete vehicle', async () => {
        // Create a new vehicle and retrieve its ID
        const mockData = (await vehicleFactory.create()) as IVehicle
        const vehicleId = mockData._id?.toString()

        // Attempt to delete the vehicle by its ID
        await Vehicle.findByIdAndDelete(vehicleId)

        // Attempt to find the deleted vehicle
        const deletedVehicle = await Vehicle.findById(vehicleId)

        // Verify that the deleted vehicle is null (not found)
        expect(deletedVehicle).toBeNull()
    })
})