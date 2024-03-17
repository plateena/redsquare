import AppClass from '../../src/app'
import request from 'supertest'
import Vehicle, { IVehicle } from '../../src/models/Vehicle'
import VehicleFactory from '../factories/vehicleFactory'
import { ISearch } from '../../src/models/BaseModel'

let app = new AppClass().app

describe('Vehicle API', () => {
    afterEach( async () => {
        // Vehicle.truncate()
    })

    it('can view vehicle list', async () => {
        const data = (await VehicleFactory.count(10).make()) as IVehicle[]

        const mongoResult: ISearch<IVehicle> = {
            status: 'success',
            data,
            total: data.length

        }
        const mockSearch  = jest.spyOn(Vehicle, 'search')
        mockSearch.mockResolvedValue(mongoResult)

        let rs = await request(app).get('/api/v1/vehicle')
        expect(rs.status).toBe(200)
        expect(rs.body).toStrictEqual(mongoResult)
    })

    it("can view vehilcle", async () => {
        const data = (await VehicleFactory.count(10).make()) as IVehicle[]

        const mockSearch  = jest.spyOn(Vehicle, 'findById')
        mockSearch.mockResolvedValue(data[0])

        let rs = await request(app).get(`/api/v1/vehicle/${data[0]._id}`)
        console.log(rs.body)

        expect(rs.status).toBe(200)
        expect(rs.body).toStrictEqual(data[0])
    });
})