import { Request, Response, NextFunction } from "express";

import { CatchAsyncError } from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import { IOrder } from "../interfaces/orderModel.interface";
import { userModel } from "../models/user.model";
import { courseModel } from "../models/course.model";
import { getAllOrdersService, newOrder } from "../services/order.service";
import path from "path";
import ejs from "ejs";
import { sendMail } from "../utils/sendMail";
import { notificationModel } from "../models/notification.model";
import { redis } from "../db/redis";
import { ICourse } from "../interfaces/courseModel.interface";
require("dotenv").config()

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

//create order
export const createOrder = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { courseId, payment_infor } = req.body as IOrder

        if (payment_infor) {

            if ("id" in payment_infor) {

                const paymentIntentId = payment_infor.id

                const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

                if (paymentIntent.status !== "succeeded") {

                    return next(new ErrorHandler('Payment not authorized', 400))

                }

            }

        }

        const user = await userModel.findById(req.user?._id)

        const courseExistInUser = user?.courses.some((course: any) => course._id.toString() === courseId)

        if (courseExistInUser) {

            return next(new ErrorHandler('You have already purchased this course', 400))

        }

        const course: ICourse | null = await courseModel.findById(courseId)

        if (!course) {

            return next(new ErrorHandler('Course not found', 404))

        }

        const data: any = {
            courseId: course._id,
            userId: user?._id,
            payment_infor
        }

        const mailData = {

            order: {
                _id: course._id.toString().slice(0, 6),
                name: course.name,
                price: course.price,
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            }
        }

        const html = await ejs.renderFile(path.join(__dirname, '../ejs/mails/order-confirmation.ejs'), { order: mailData })

        try {

            if (user) {

                await sendMail({
                    email: user.email,
                    subject: 'Order Comfirmation',
                    template: 'order-confirmation.ejs',
                    data: mailData
                })

            }

        } catch (error: any) {

            return next(new ErrorHandler(error.message, 500))

        }

        user?.courses.push(course?._id)

        await redis.set(req.user?._id, JSON.stringify(user))

        await user?.save()

        await notificationModel.create({
            user: user?._id,
            title: 'New Order',
            message: `You have a new order from ${course?.name}`
        })

        course.purchased = course.purchased + 1

        await course.save()

        console.log(course.purchased);

        newOrder(data, res, next)

    } catch (error: any) {

        return next(new ErrorHandler(error.message, 500))

    }

})

//get all orders - only for admin
export const getAllOrders = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    try {

        getAllOrdersService(res)

    } catch (error: any) {

        return next(new ErrorHandler(error.message, 400))

    }

})

//send stripe publishble key
export const sendStripePublishableKey = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    res.status(200).json({

        publishablekey: process.env.STRIPE_PUBLISHABLE_KEY

    })

})

//new payment
export const newPayment = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    try {

        const myPayment = await stripe.paymentIntents.create({

            amount: req.body.amount,
            currency: "USD",
            metadata: {
                company: "BHcodemy"
            },
            automatic_payment_methods: {
                enabled: true
            }

        })

        res.status(201).json({

            success: true,
            client_secret: myPayment.client_secret

        })

    } catch (error: any) {

        return next(new ErrorHandler(error.message, 400))

    }

})