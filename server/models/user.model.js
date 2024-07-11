import mongoose from "mongoose"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const validateEmail = function (email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        maxLength: 25,
        minLenght: 3
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    password: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        required: true,
        maxLength: 10,
        minLength: true
    },

    address: {
        type: String,
        required: true
    },

    answer: {
        type: String,
        required: true,
    },

    role: {
        type: Number,
        default: 0
    },

    refreshToken: {
        type: String
    }
}, { timestamps: true })

userSchema.pre('save', async () => {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async(password)=>{
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async()=>{
    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
    }, process.env.ACCESS_TOKEN_SECRET)
}

userSchema.methods.geberateRefreshToken = async()=>{
    return jwt.sign({
        _id: this._id
    }, process.env.REFRESH_TOKEN_SECRET)
}

export const User = mongoose.model('User', userSchema)

