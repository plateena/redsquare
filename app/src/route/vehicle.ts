import express, { Router, Request, Response } from 'express'
import Vehicle, { IVehicle } from '../models/Vehicle'

const router: Router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    try {
        const vehicles: IVehicle[] = await Vehicle.search({})
        if (vehicles.length === 0) {
            res.json('No vehicles found')
        }

        res.json(vehicles)
    } catch (error) {
        console.error('Error fetching vehicles:', error)
        res.status(500).send('Internal Server Error')
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        // const vehicle = await Vehicle.findById(id)
        // if (!vehicle) {
        //     res.status(404).send('Vehicle not found')
        //     return
        // }
        // res.json(vehicle)
    } catch (error) {
        console.error('Error fetching vehicle:', error)
        res.status(500).send('Internal Server Error')
    }
})

export default router