import { Router } from 'express'
import vehicleRoutes from './vehicle'
import maintenanceRoutes from './maintenance'

const router: Router = Router()

// Middleware for logging requests
router.use((req, res, next) => {
    // console.log(`Request URL: ${req.originalUrl}, Method: ${req.method}`)
    next()
})

router.use('/vehicle', vehicleRoutes)
router.use('/maintenance', maintenanceRoutes)

export default router