import AppClass from '../../src/app'
import request from 'supertest'
import Vehicle, { IVehicle } from '../../src/models/Vehicle'
import VehicleFactory from '../factories/vehicleFactory'
import { BaseModel, IBaseModel } from '../../src/models/BaseModel'

let app = new AppClass().app
jest.mock('../../src/models/Vehicle')

describe('Vehicle API', () => {
    it('GET', async () => {
        // Define mock data to be returned by Vehicle.search()
        const mockVehicles = VehicleFactory.count(5).make() as IVehicle[]

        Vehicle.search = jest.fn().mockResolvedValue('helloo')

        let rs = await request(app).get('/api/v1/vehicles')
        expect(rs.status).toBe(200)
    })
})