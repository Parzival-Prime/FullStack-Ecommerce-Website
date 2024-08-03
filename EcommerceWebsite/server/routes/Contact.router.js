import { Router } from 'express'
import { sendEmailController } from '../controllers/contact.controller.js'

const router = Router()

router.route('/email').post(sendEmailController)

export default router
