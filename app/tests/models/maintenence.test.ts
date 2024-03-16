import { ISearch } from '../../src/models/BaseModel';
import Maintenance, { IMaintenance } from '../../src/models/Maintainence'
import maintenanceFactory from '../factories/maintenanceFactory';
import './../setup-db'

describe("Maintenence Model", () => {
    beforeEach(async () => {
        await Maintenance.truncate()
    })

    afterEach(async () => {
        await Maintenance.truncate()
    })

    it("can find model", async () => {
        const mockData = await maintenanceFactory.count(10).create()
        const rs = await Maintenance.find({})
        expect(rs.length).toEqual(10)
    });

    it('can retrive the Maintenance', async () => {
        let createdData = (await maintenanceFactory.count(10).create()) as IMaintenance[]

        let result: ISearch<IMaintenance> = await Maintenance.search({
            page: 1,
            perPage: 10,
            populate: 'vehicle',
        })

        expect(result.data.length).toBe(10)
    })
});