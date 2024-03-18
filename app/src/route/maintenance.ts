import { Router } from 'express'
import Maintenance from '../models/Maintenance'
import BaseRestController from '../controllers/BaseRestController'
import { IBaseModel } from '../models/BaseModel'

const router: Router = Router()
const MaintenanceRestController = new BaseRestController<IBaseModel>(Maintenance)

router.get('/', MaintenanceRestController.list)
router.get('/:id', MaintenanceRestController.getById)
router.post('/', MaintenanceRestController.create)
router.put('/:id', MaintenanceRestController.update)
router.post('/:id', MaintenanceRestController.update)
router.delete('/:id', MaintenanceRestController.delete)

export default router