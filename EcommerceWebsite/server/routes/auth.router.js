import express from 'express'
import {
    registerController,
    loginController,
    logoutController,
    changePasswordController,
    userProfileController,
    updateUserController
} from '../controllers/auth.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/multer.middleware.js'

const router = express.Router()



router.route('/register').post(upload.fields([
    {
        name: 'profileImage',
        maxCount: 1
    }
]), registerController)

router.route('/login').post(loginController)



// ========= Secured Routes ========== //
router.route('/logout').post(verifyJWT, logoutController)

// Profile Routes
router.route('/change-password').patch(verifyJWT, changePasswordController)

router.route('/user-profile').get(verifyJWT, userProfileController)

router.route('/update-user').put(verifyJWT, updateUserController)


export default router