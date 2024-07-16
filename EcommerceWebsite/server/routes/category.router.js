import express from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { getAllCategoriesController } from '../controllers/category.Controller.js'

const router = express.Router()

router.route('/get-categories').get(getAllCategoriesController)


export default router