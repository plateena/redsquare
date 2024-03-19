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
        const createdData = (await vehicleFactory.count(10).create()) as IVehicle[]
        createdData.sort((a, b) => a.plateNumber.localeCompare(b.plateNumber))
        const result: ISearch<IVehicle> = await Vehicle.search({
            sort: 'plateNumber',
        })
        const createdDataPlateNumbers = createdData.map((vehicle) => vehicle.plateNumber)
        const resultDataPlateNumbers = result.data?.map((vehicle) => vehicle.plateNumber)
        expect(resultDataPlateNumbers).toEqual(createdDataPlateNumbers)
    })

    it('can add vehilcle', async () => {
        const mockData = await vehicleFactory.make()
        const result = await Vehicle.create(mockData)

        expect(result).toEqual(expect.objectContaining(result))
    })

    it('can edit vehicle', async () => {
        const mockData = (await vehicleFactory.create()) as IVehicle
        const vehicleId = mockData._id?.toString()
        const foundVehicle = await Vehicle.findById(vehicleId)
        expect(foundVehicle).toBeDefined()
        foundVehicle!.color = 'edit-' + foundVehicle!.color
        foundVehicle!.brand = 'edit-' + foundVehicle!.brand
        foundVehicle!.model = 'edit-' + foundVehicle!.model
        await foundVehicle!.save()
        const updatedVehicle = await Vehicle.findById(vehicleId)
        expect(updatedVehicle!.color).toEqual('edit-' + mockData.color)
        expect(updatedVehicle!.brand).toEqual('edit-' + mockData.brand)
        expect(updatedVehicle!.model).toEqual('edit-' + mockData.model)
    })

    it('can delete vehicle', async () => {
        const mockData = (await vehicleFactory.create()) as IVehicle
        const vehicleId = mockData._id?.toString()
        await Vehicle.findByIdAndDelete(vehicleId)
        const deletedVehicle = await Vehicle.findById(vehicleId)
        expect(deletedVehicle).toBeNull()
    }, 60000)
})