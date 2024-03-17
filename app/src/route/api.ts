import express, { Router } from 'express'
import vehicleRoutes from './vehicle'

const router: Router = express.Router()

// Middleware for logging requests
router.use((req, res, next) => {
    // console.log(`Request URL: ${req.originalUrl}, Method: ${req.method}`)
    next()
})

// Mount vehicle routes
router.use('/vehicle', vehicleRoutes)
// Add other routes here...

export default router