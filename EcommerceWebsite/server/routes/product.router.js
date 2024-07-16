import express from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { getAllProductsController } from '../controllers/product.controller.js'

const router = express.Router()

router.route('/get-products').get(getAllProductsController)


export default router