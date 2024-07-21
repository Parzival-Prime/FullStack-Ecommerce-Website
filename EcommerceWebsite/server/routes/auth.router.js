import express from 'express'
import {
    registerController,
    loginController,
    logoutController,
    changePasswordController,
    userProfileController,
    updateUserController,
    addToCartController
} from '../controllers/auth.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/multer.middleware.js'

const router = express.Router()



router.route('/register').post(upload.single('file'), registerController)

router.route('/login').post(loginController)



// ========= Secured Routes ========== //
router.route('/logout').get(verifyJWT, logoutController)

router.route('/add-to-cart').post(verifyJWT, addToCartController)


// Profile Routes
router.route('/change-password').patch(verifyJWT, changePasswordController)

router.route('/user-profile').get(verifyJWT, userProfileController)

router.route('/update-user').put(verifyJWT, updateUserController)


export default router