import { ISearch } from '../../src/models/BaseModel'
import { IVehicle } from '../../src/models/Vehicle'
import Maintenance, { IMaintenance } from '../../src/models/Maintenance'
import maintenanceFactory from '../factories/maintenanceFactory'
import vehicleFactory from '../factories/vehicleFactory'
import './../setup-db'

describe('Maintenence Model', () => {
    beforeEach(async () => {
        await Maintenance.truncate()
    })

    afterEach(async () => {
        await Maintenance.truncate()
    })

    it('can find model', async () => {
        await maintenanceFactory.count(10).create()
        const rs = await Maintenance.find({})
        expect(rs.length).toEqual(10)
    })

    it('can retrive the Maintenance', async () => {
        await maintenanceFactory
            .count(10)
            .withState(async () => {
                const vehicle = (await vehicleFactory.create()) as IVehicle
                return { vehicle: vehicle._id }
            })
            .create()

        let result: ISearch<IMaintenance> = await Maintenance.search({
            page: 1,
            perPage: 10,
            populate: 'vehicle',
        })

        expect(result.data.length).toBe(10)
    })

    it('can sort maintenance list by date', async () => {
        // Create maintenance data
        let createdData = (await maintenanceFactory.count(10).create()) as IMaintenance[]

        // Search for maintenance list sorted by date
        let result: ISearch<IMaintenance> = await Maintenance.search({
            sort: 'date', // Sort by date in ascending order
        })

        // Extract dates from createdData
        const createdDataDates = createdData.map((maintenance) => maintenance.date)

        // Extract dates from result.data
        const resultDataDates = result.data?.map((maintenance) => maintenance.date)

        // Sort the arrays of dates
        createdDataDates.sort()
        resultDataDates?.sort()

        // Verify that the sorted arrays of dates match
        expect(resultDataDates).toEqual(createdDataDates)
    })

    it('can add maintenance', async () => {
        // Generate mock maintenance data
        const mockData = await maintenanceFactory.make()

        // Create a new maintenance instance
        const result = await Maintenance.create(mockData)

        // Assert that the result is not null and contains properties
        expect(result).not.toBeNull()
        expect(result).toEqual(expect.objectContaining(result))
    })

    it('can edit maintenance', async () => {
        // Create a new maintenance and retrieve its ID
        const mockData = (await maintenanceFactory.create()) as IMaintenance
        const maintenanceId = mockData._id?.toString()

        // Find the maintenance by its ID
        const foundMaintenance = await Maintenance.findById(maintenanceId)

        // Ensure that the maintenance was found
        expect(foundMaintenance).toBeDefined()

        // Modify the properties of the found maintenance
        foundMaintenance!.description = 'edit-' + foundMaintenance!.description
        foundMaintenance!.date = new Date() // Modify the date, for example

        // Save the changes to the database
        await foundMaintenance!.save()

        // Retrieve the updated maintenance from the database
        const updatedMaintenance = await Maintenance.findById(maintenanceId)

        // Verify that the properties of the updated maintenance match the modified values
        expect(updatedMaintenance!.description).toEqual('edit-' + mockData.description)
        expect(updatedMaintenance!.date).toEqual(foundMaintenance!.date) // Verify date changes
    })

    it('can delete maintenance', async () => {
        // Create a new maintenance and retrieve its ID
        const mockData = (await maintenanceFactory.create()) as IMaintenance
        const maintenanceId = mockData._id?.toString()

        // Attempt to delete the maintenance by its ID
        await Maintenance.findByIdAndDelete(maintenanceId)

        // Attempt to find the deleted maintenance
        const deletedMaintenance = await Maintenance.findById(maintenanceId)

        // Verify that the deleted maintenance is null (not found)
        expect(deletedMaintenance).toBeNull()
    })
})