import { Router } from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { paymentController } from '../controllers/payment.controller.js'

const router = Router()


router.route('/create-checkout-session').post(paymentController)


export default router