import { User } from '../models/user.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import mongoose from 'mongoose'

const options = {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: 'none'
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

        const loggedInUser = await User.findById(user._id).select('-password -refreshToken')

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                success: true,
                message: 'User LoggedIn Successfully',
                user: loggedInUser,
                accessToken: accessToken,
                refreshToken: refreshToken
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




export const addToCartController = async (req, res) => {
    try {
        const { productId, quantity, price, name } = req.body
        const user = req.user

        if (!productId) return res.status(404).send({ success: false, message: 'ProductId not found' })


        if (quantity === undefined) {
            try {
                const result = await User.findOneAndUpdate({ _id: user._id }, { $push: { cart: { productId, quantity: 1, price, name } } }, { new: true })

                console.log(result)

                return res.status(200).send({
                    success: true,
                    message: 'Item added to cart successfully',
                    result
                })
            } catch (error) {
                console.log(error)
            }
        }

        else if (quantity !== 0) {
            try {
                const result = await User.findOneAndUpdate(
                    { _id: user._id, 'cart.productId': productId },
                    { $set: { 'cart.$.quantity': quantity } }, { new: true }
                )

                console.log(result)
                return res.status(200).send({
                    success: true,
                    message: 'Item added to cart successfully',
                    result
                })
            } catch (error) {
                console.log(error)
            }
        }

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'Something went wrong in addToCart Controller'
        })
    }
}



export const updateCartController = async (req, res) => {
    try {
        const cart = req.body

        if (!cart) return res.status(404).send({ success: false, message: 'Cart is found Empty' })

        await User.findByIdAndUpdate(req.user._id, { $set: { cart: cart } }, { new: true })

        return res.status(200).send({
            success: true,
            message: 'User Cart Updated Successfully!'
        })
    } catch (error) {
        console.log(error)
        return res.status(404).send({
            success: false,
            message: 'Something went wrong in updateCart Controller'
        })
    }
}




export const getCartController = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)

        return res.status(200).send({
            success: true,
            message: 'All Products in Cart Fetched successfully!',
            cart: user.cart
        })

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'Something went wrong in getCartItems Controller'
        })
    }
}