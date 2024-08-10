import { Router } from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { paymentController, getPaymentDetails } from '../controllers/payment.controller.js'

const router = Router()


router.route('/create-checkout-session').post(paymentController)

router.route('/get-payment-details').post(getPaymentDetails)


export default router