import mongoose, { Model, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import { IUser } from '../interfaces/userModel.interface'

dotenv.config()

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const userSchema: Schema<IUser> = new mongoose.Schema({
    name: {

        type: String,

        required: [true, 'Please enter your name']

    },
    email: {

        type: String,

        required: [true, 'Please enter your email'],

        validate: {
            validator: function (value: string) {
                return emailRegexPattern.test(value)
            },
            message: 'Please enter a valid email'
        },

        unique: true

    },
    password: {

        type: String,

        minlength: [6, 'Password must be at least 6 characters'],

        select: false

    },
    avatar: {

        public_id: String,

        url: String
    },
    role: {

        type: String,

        default: 'user'

    },
    isVerified: {

        type: Boolean,

        default: false

    },
    courses: [
        {
            coursesId: String

        }
    ]
}, { timestamps: true })

//hash password before saving
userSchema.pre<IUser>('save', async function (next) {

    if (!this.isModified('password')) {

        next()

    } else {

        this.password = await bcrypt.hash(this.password, 10)

        next()

    }

})

//sign access token
userSchema.methods.SignAccessToken = function () {

    return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || '', { expiresIn: '5m' })

}

//sign refresh token
userSchema.methods.SignRefreshToken = function () {

    return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || '', { expiresIn: '3d' })

}

//compare password
userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {

    return await bcrypt.compare(enteredPassword, this.password)

}

export const userModel: Model<IUser> = mongoose.model('User', userSchema)