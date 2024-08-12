import express from 'express'
import {
    registerController,
    loginController,
    logoutController,
    changePasswordController,
    userProfileController,
    updateUserController,
    getCartController,
    addToCartController,
    updateCartController,
    getDashboardData,
    getAllOrders
} from '../controllers/auth.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/multer.middleware.js'

const router = express.Router()



router.route('/register').post(upload.single('file'), registerController)

router.route('/login').post(loginController)



// ========= Secured Routes ========== //
router.route('/logout').get(verifyJWT, logoutController)

router.route('/get-cart').get(verifyJWT, getCartController)

router.route('/add-to-cart').post(verifyJWT, addToCartController)

router.route('/update-cart').post(verifyJWT, updateCartController)

router.route('/get-all-Orders').get(verifyJWT, getAllOrders)

router.route('/get-dashboard-data').get(getDashboardData)


// Profile Routes
router.route('/change-password').patch(verifyJWT, changePasswordController)

router.route('/user-profile').get(verifyJWT, userProfileController)

router.route('/update-user').put(verifyJWT, upload.single('profileImage'), updateUserController)


export default router