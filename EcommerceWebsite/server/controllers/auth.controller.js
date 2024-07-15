import { User } from '../models/user.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'

const options = {
    httpOnly: true,
    secure: true
}

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findOne(userId)

        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        console.log('Error occured in generating access and refresh token', error)
    }
}

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body
        
        if (
            !name || !email || !password || !phone || !address || !answer
        ) {
            return res.status(400).send({
                success: false,
                message: 'All fields are required'
            })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) return res.status(404).send({ success: false, message: 'User with this email already exists' })

        const ImageLocalPath = req.file?.path 

        const profileImage = await uploadOnCloudinary(ImageLocalPath)


        const user = await User.create({ name, email, password, phone, address, answer, profileImage: profileImage?.url })

        const createdUser = await User.findOne(user._id).select('-password -refreshToken')

        return res.status(201).send({
            success: true,
            message: 'User registered Successfully',
            createdUser
        })

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'Error occured in register Controller',
            error
        })
    }
}


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!password && !email) {
            return res.status(400).send({
                success: false,
                message: 'All fields are required'
            })
        }

        const user = await User.findOne({ email })
        console.log(password)
        console.log('user: ', user)

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User does not exists'
            })
        }

        const isPasswordValid = await user.isPasswordCorrect(password)

        if (!isPasswordValid) {
            return res.status(401).send({
                success: false,
                message: 'Invalid Password'
            })
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)
        console.log('accessToken: ', accessToken)
        console.log('refreshToken: ', refreshToken)

        const loggedInUser = await User.findById(user._id).select('-password -refreshToken')
        console.log(loggedInUser)

        return res
            .status(200)
            .cookie('accessToken', accessToken, options)
            .cookie('refreshToken', refreshToken, options)
            .send({
                success: true,
                message: 'User LoggedIn Successfully',
                user: loggedInUser
            })

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'Error occured in login Controller',
            error
        })
    }
}

export const logoutController = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user._id, { $set: { refreshToken: undefined } }, { new: true })

        return res
            .status(200)
            .clearCookie('accessToken', options)
            .clearCookie('refreshToken', options)
            .send({
                success: true,
                message: 'LoggedOut Successfully'
            })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: "Error occured in logout Controller"
        })
    }
}


export const changePasswordController = async (req, res) => {
    try {
        const { password } = req.body
        const res = await User.findByIdAndUpdate(req.user._id, { $set: { password: password } }, { new: true }).select('-password -refreshToken')

        return res.status(200).sned({
            success: true,
            message: 'Password Changed Successfully',
            user: res
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'Some error occured in changePassword Controller',
            error
        })
    }
}



export const userProfileController = async (req, res) => {
    try {
        const { user } = req.user

        return res.status(200).send({
            success: true,
            message: 'User data fetched Successfully',
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'Some Error occuered in user Profile Controller'
        })
    }
}



export const updateUserController = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body
        const { user } = req.user

        const updatedUser = await User.findByIdAndUpdate(user._id, { email, name, phone, address }, { new: true }).select('-password -refreshToken')
        return res.status(200).send({
            success: true,
            message: 'User Updated Successfully',
            user: updatedUser
        })
    } catch (error) {
        console.log(error)
        return res.status(400).sned({
            success: false,
            message: 'Some Error occuered in user Update Controller',
            error
        })
    }
}