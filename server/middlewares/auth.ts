import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'

import { CatchAsyncError } from "./catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import { redis } from "../db/redis";
import { IUser } from "../interfaces/userModel.interface";

dotenv.config()

declare global {

    namespace Express {

        interface Request {

            user?: IUser
        }

    }

}

//authenticated user
export const isAuthenticated = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    const access_token = req.cookies.access_token

    if (!access_token) {

        return next(new ErrorHandler('Please login to access the resources', 400))

    }

    const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN as string) as JwtPayload

    if (!decoded) {

        return next(new ErrorHandler('Access token is not valid', 403))

    }

    const user = await redis.get(decoded.id)

    if (!user) {

        return next(new ErrorHandler('Please login to access the resource', 400))

    }

    req.user = JSON.parse(user)

    next()

})

//validate user role
export const authorizeRoles = (...roles: string[]) => {

    return (req: Request, res: Response, next: NextFunction) => {

        if (!roles.includes(req.user?.role || '')) {

            return next(new ErrorHandler(`Role: ${req.user?.role} is not allowed to access the resoures`, 403))

        }

        next()

    }

}