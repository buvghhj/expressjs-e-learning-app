import { Response } from "express"

import { redis } from "../db/redis"
import { userModel } from "../models/user.model"

//get user by id
export const getUserById = async (id: string, res: Response) => {

    const userJson = await redis.get(id)

    if (userJson) {

        const user = JSON.parse(userJson)

        res.status(201).json({
            success: true,
            user
        })

    }

}

//get all user
export const getAllUsersService = async (res: Response) => {

    const users = await userModel.find().sort({ createdAt: -1 })

    res.status(200).json({
        success: true,
        users
    })

}

//update user role
export const updateUserRoleService = async (res: Response, email: string, role: string) => {

    const user = await userModel.findOneAndUpdate({ email }, { role }, { new: true })

    res.status(200).json({
        success: true,
        user
    })


}