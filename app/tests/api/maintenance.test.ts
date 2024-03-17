import AppClass from '../../src/app'
import { Document } from 'mongoose'
import request from 'supertest'
import Maintenance, { IMaintenance } from '../../src/models/Maintenance'
import MaintenanceFactory from '../factories/maintenanceFactory'
import { ISearch } from '../../src/models/BaseModel'
import { ObjectId } from 'mongodb'

let app = new AppClass().app

describe('Maintenance API', () => {
    afterEach(async () => {})

    it('can add maintenance', async () => {
        const mockData = await MaintenanceFactory.make() as any

        const mockCreate = jest.spyOn(Maintenance, 'create')
        mockCreate.mockResolvedValue(mockData)

        const rs = await request(app).post('/api/v1/maintenance').send(mockData)

        expect(rs.status).toBe(201)
        expect(rs.body).toStrictEqual(mockData)
    })

    it('can view maintenance list', async () => {
        const data = (await MaintenanceFactory.count(10).make()) as IMaintenance[]

        const mongoResult: ISearch<IMaintenance> = {
            status: 'success',
            data,
            total: data.length,
        }

        const mockSearch = jest.spyOn(Maintenance, 'search')
        mockSearch.mockResolvedValue(mongoResult)

        const rs = await request(app).get('/api/v1/maintenance')

        expect(rs.status).toBe(200)
        expect(rs.body).toStrictEqual(mongoResult)
    })

    it('can view maintenance', async () => {
        const data = (await MaintenanceFactory.count(10).make()) as IMaintenance[]

        const mockFindById = jest.spyOn(Maintenance, 'findById')
        mockFindById.mockResolvedValue(data[0])

        const rs = await request(app).get(`/api/v1/maintenance/${data[0]._id}`)

        expect(rs.status).toBe(200)
        expect(rs.body).toStrictEqual(data[0])
    })

    it('can update maintenance', async () => {
        const data = (await MaintenanceFactory.make()) as IMaintenance

        const updatedData = { ...data, color: 'Updated Color' } // Modify the color property for update

        const mockFindByIdAndUpdate = jest.spyOn(Maintenance, 'findByIdAndUpdate')
        mockFindByIdAndUpdate.mockResolvedValue(updatedData)

        const rs = await request(app).put(`/api/v1/maintenance/${data._id}`).send(updatedData)

        expect(rs.status).toBe(200)
        // expect(rs.body).toEqual(updatedData)
    })

    it('can delete maintenance', async () => {
        const data = (await MaintenanceFactory.make()) as IMaintenance

        const mockFindByIdAndDelete = jest.spyOn(Maintenance, 'findByIdAndDelete')
        mockFindByIdAndDelete.mockResolvedValue(data)

        const rs = await request(app).delete(`/api/v1/maintenance/${data._id}`)

        expect(rs.status).toBe(200)
        expect(rs.body).toStrictEqual({ message: 'Item deleted successfully' })
    })
})