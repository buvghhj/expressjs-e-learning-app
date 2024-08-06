import { Request, Response, NextFunction } from "express";
import cloudinary from 'cloudinary'

import { CatchAsyncError } from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import { layoutModel } from "../models/layout.model";

//create layout
export const createLayout = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { type, banner } = req.body

        const isTypeExist = await layoutModel.findOne({ type })

        if (isTypeExist) {

            return next(new ErrorHandler(`${type} already exist`, 400))

        }

        if (type === 'Banner') {

            const { image, title, subTitle } = banner

            const myCloud = await cloudinary.v2.uploader.upload(image, { folder: 'layouts' })

            const bannerData = {

                image: {

                    public_id: myCloud.public_id,

                    url: myCloud.secure_url

                },

                title,

                subTitle

            }

            await layoutModel.create({ type: 'Banner', banner: bannerData })

        }

        if (type === 'FAQ') {

            const { faq } = req.body

            const faqItems = await Promise.all(faq.map(async (item: any) => { return { question: item.question, answer: item.answer } }))

            await layoutModel.create({ type: 'FAQ', faq: faqItems })

        }

        if (type === 'Categories') {

            const { categories } = req.body

            const categoriesItems = await Promise.all(categories.map(async (item: any) => { return { title: item.title } }))

            await layoutModel.create({ type: 'Categories', categories: categoriesItems })

        }

        res.status(200).json({ success: true, message: 'Layout created successfully' })

    } catch (error: any) {

        return next(new ErrorHandler(error.message, 400))

    }

})

//edit layout
export const editLayout = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { type } = req.body

        if (type === 'Banner') {

            const bannerData: any = await layoutModel.findOne({ type: 'Banner' })

            const { image, title, subTitle } = req.body

            const data = image.startsWith("https") ? bannerData : await cloudinary.v2.uploader.upload(image, { folder: "layout" })

            const banner = {

                type: "Banner",

                image: {

                    public_id: image.startsWith("https") ? bannerData.banner.image.public_id : data?.public_id,

                    url: image.startsWith("https") ? bannerData.banner.image.url : data?.secure_url

                },

                title,

                subTitle

            }

            await layoutModel.findByIdAndUpdate(bannerData._id, { banner })

        }

        if (type === 'FAQ') {

            const { faq } = req.body

            const faqItem = await layoutModel.findOne({ type: 'FAQ' })

            const faqItems = await Promise.all(faq.map(async (item: any) => { return { question: item.question, answer: item.answer } }))

            await layoutModel.findByIdAndUpdate(faqItem?._id, { type: 'FAQ', faq: faqItems })

        }

        if (type === 'Categories') {

            const { categories } = req.body

            const categoriesItem = await layoutModel.findOne({ type: 'Categories' })

            const categoriesItems = await Promise.all(categories.map(async (item: any) => { return { title: item.title } }))

            await layoutModel.findByIdAndUpdate(categoriesItem?._id, { type: 'Categories', categories: categoriesItems })

        }

        res.status(200).json({ success: true, message: 'Layout updated successfully' })

    } catch (error: any) {

        return next(new ErrorHandler(error.message, 400))

    }

})

//get layout by type
export const getLayoutByType = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { type } = req.params

        const layout = await layoutModel.findOne({ type })

        res.status(200).json({ success: true, layout })

    } catch (error: any) {

        return next(new ErrorHandler(error.message, 400))

    }

})