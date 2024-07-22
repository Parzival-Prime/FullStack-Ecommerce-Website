import express from 'express'
import { verifyJWT, isAdmin } from '../middlewares/auth.middleware.js'
import { createProductController, getAllProductsController, getCartItems } from '../controllers/product.controller.js'
import { upload } from '../middlewares/multer.middleware.js'

const router = express.Router()

router.route('/get-all-products').get(getAllProductsController)



// ============ Secured Routes ============ //
router.route('/create-product').post(verifyJWT, isAdmin, upload.single('file'), createProductController)

router.route('/get-cart-items').post(verifyJWT, getCartItems)



export default router