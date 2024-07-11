import { User } from '../models/user.model.js'


const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findOne(userId)

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

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
            [name, email, phone, address, answer, password].some((field) => field?.trim() === "")
        ) {
            return res.status(400).send({
                success: false,
                message: 'All fields are required'
            })
        }


        const existingUser = await User.findOne({ email })

        if (existingUser) return res.status(404).send({ success: false, message: 'User with this email already exists' })

        const user = await User.create({ name, email, password: hashedPassword, phone, address, answer })

        const createdUser = await User.findOne(user._id).select('-password -refreshToken')

        return res.status(201).send({
            success: false,
            message: 'User registered Successfully',
            createdUser
        })

    } catch (error) {
        console.log(error)
        return res.send({
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
                success: true,
                message: 'All fields are required'
            })
        }

        const user = await User.findOne(email)

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User does not exists'
            })
        }

        const isPasswordValid = await user.isPasswordCorrect(password)

        if (!isPasswordValid) {
            return res.status(401)
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

        const loggedInUser = await User.findById(user._id).select('-password -refreshToken')

        const options = {
            httpOnly: true,
            secure: true
        }

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
            success: true,
            message: 'Error occured in login Controller',
            error
        })
    }
}

