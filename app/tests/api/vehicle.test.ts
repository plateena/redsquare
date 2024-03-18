import AppClass from '../../src/app'
import request from 'supertest'
import Vehicle, { IVehicle } from '../../src/models/Vehicle'
import VehicleFactory from '../factories/vehicleFactory'
import { ISearch } from '../../src/models/BaseModel'

let app = new AppClass().app

describe('Vehicle API', () => {
    afterEach(async () => {})

    it('can add vehicle', async () => {
        const mockData = await VehicleFactory.make() // Create mock vehicle data

        const mockCreate = jest.spyOn(Vehicle, 'create') // Spy on the create method of the Vehicle model
        mockCreate.mockResolvedValue(mockData) // Mock the resolved value of the create method

        const rs = await request(app).post('/api/v1/vehicle').send(mockData) // Send a POST request with the mock data

        expect(rs.status).toBe(201) // Assert that the response status is 201
        expect(rs.body).toStrictEqual(mockData) // Assert that the response body matches the mock data
    })

    it('can view vehicle list', async () => {
        const data = (await VehicleFactory.count(10).make()) as IVehicle[]

        const mongoResult: ISearch<IVehicle> = {
            status: 'success',
            data,
            total: data.length,
        }

        const mockSearch = jest.spyOn(Vehicle, 'search')
        mockSearch.mockResolvedValue(mongoResult)

        const rs = await request(app).get('/api/v1/vehicle')

        expect(rs.status).toBe(200)
        expect(rs.body).toStrictEqual(mongoResult)
    })

    it('can view vehicle', async () => {
        const data = (await VehicleFactory.count(10).make()) as IVehicle[]

        const mockFindById = jest.spyOn(Vehicle, 'findById')
        mockFindById.mockResolvedValue(data[0])

        const rs = await request(app).get(`/api/v1/vehicle/${data[0]._id}`)

        expect(rs.status).toBe(200)
        expect(rs.body).toStrictEqual(data[0])
    })

    it('can update vehicle', async () => {
        const data = (await VehicleFactory.make()) as IVehicle

        const updatedData = { ...data, color: 'Updated Color' } // Modify the color property for update

        const mockFindByIdAndUpdate = jest.spyOn(Vehicle, 'findByIdAndUpdate')
        mockFindByIdAndUpdate.mockResolvedValue(updatedData)

        const rs = await request(app).put(`/api/v1/vehicle/${data._id}`).send(updatedData)

        expect(rs.status).toBe(200)
        expect(rs.body).toStrictEqual(updatedData)
    })

    it('can delete vehicle', async () => {
        const data = (await VehicleFactory.make()) as IVehicle

        const mockFindByIdAndDelete = jest.spyOn(Vehicle, 'findByIdAndDelete')
        mockFindByIdAndDelete.mockResolvedValue(data)

        const rs = await request(app).delete(`/api/v1/vehicle/${data._id}`)

        expect(rs.status).toBe(200)
        expect(rs.body).toStrictEqual({ message: 'Item deleted successfully' })
    })
})