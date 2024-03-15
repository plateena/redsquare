import express, { Router, Request, Response } from 'express'
import Vehicle, { IVehicle } from '../models/Vehicle'
import BaseRestController from '../controllers/BaseRestController'
import { IBaseModel } from '../models/BaseModel'

const router: Router = express.Router()
const VehicleRestController = new BaseRestController<IBaseModel>(Vehicle)

router.get('/', VehicleRestController.list)
router.get('/:id', VehicleRestController.getById)
router.post('/', VehicleRestController.create)
router.put('/:id', VehicleRestController.update)
router.post('/:id', VehicleRestController.update)
router.delete('/:id', VehicleRestController.delete)

export default router