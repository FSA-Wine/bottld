import express from 'express'
import wineRoutes from './wines.mjs'

const router = express.Router()

router.use('/wines', wineRoutes)

export default router
