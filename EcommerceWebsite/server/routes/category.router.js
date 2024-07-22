import express from 'express'
import { verifyJWT, isAdmin } from '../middlewares/auth.middleware.js'
import { getAllCategoriesController, createCategoryController } from '../controllers/category.Controller.js'

const router = express.Router()


router.route('/get-categories').get(getAllCategoriesController)


// ========== Secured Routes ========== //

router.route('/create-category').post(verifyJWT, isAdmin, createCategoryController)



export default router