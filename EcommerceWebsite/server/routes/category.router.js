import express from 'express'
import { verifyJWT, isAdmin } from '../middlewares/auth.middleware.js'
import { getAllCategoriesController, createCategoryController } from '../controllers/category.Controller.js'

const router = express.Router()


// ========== Secured Routes ========== //

router.route('/create-category').post(verifyJWT, isAdmin, createCategoryController)



router.route('/get-categories').get(getAllCategoriesController)


export default router