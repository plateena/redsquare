import AppClass from '../../src/app'
import request from 'supertest'

let app = (new AppClass()).app

describe('Vehicle API', () => {
    it('GET', async () => {
        let rs = await request(app).get('/api/v1/vehicles')
        expect(rs.status).toBe(201)
    })
})