import express from 'express'
import { verifyJWT, isAdmin } from '../middlewares/auth.middleware.js'
import { createProductController, getAllProductsController } from '../controllers/product.controller.js'
import { upload } from '../middlewares/multer.middleware.js'

const router = express.Router()


// ============ Secured Routes ============ //
router.route('/create-product').post(verifyJWT, isAdmin, upload.single('file'), createProductController)


router.route('/get-all-products').get(getAllProductsController)


export default router