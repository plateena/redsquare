import Maintenance from '../../src/models/Maintainence'
import maintenanceFactory from '../factories/maintenanceFactory';
import './../setup-db'

describe("Maintenence Model", () => {
    afterEach(async () => {
        await Maintenance.truncate()
    })

    it("can find model", async () => {
        const mockData = await maintenanceFactory.count(10).make()
        console.log(mockData)
    });
});