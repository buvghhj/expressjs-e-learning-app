import { Request, Response, NextFunction } from "express";
import cloudinary from 'cloudinary';

import { CatchAsyncError } from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import { createCourse, getAllCoursesAdminService } from "../services/course.service";
import { courseModel } from "../models/course.model";
import { redis } from "../db/redis";
import { IAddAnswerData, IAddQuestionData, IAddReplyToReviewData, IAddReviewData } from "../interfaces/courseController.interface";
import mongoose from "mongoose";
import ejs from "ejs";
import path from "path";
import { sendMail } from "../utils/sendMail";
import { notificationModel } from "../models/notification.model";
import axios from "axios";
import { url } from "inspector";

//upload course
export const uploadCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    try {

        const data = req.body

        const thumbnail = data.thumbnail

        if (thumbnail) {

            const myCloud = await cloudinary.v2.uploader.upload(thumbnail, { folder: 'courses' })

            data.thumbnail = {

                public_id: myCloud.public_id,

                url: myCloud.secure_url

            }

        }

        createCourse(data, res, next)

    } catch (error: any) {

        return next(new ErrorHandler(error.message, 500))

    }

})

//edit course
export const editCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    try {
        const data = req.body

        const thumbnail = data.thumbnail

        const courseId = req.params.id

        const courseData = await courseModel.findById(courseId) as any

        if (thumbnail && !thumbnail.startsWith("https")) {

            await cloudinary.v2.uploader.destroy(courseData.thumbnail.public_id)

            const myCloud = await cloudinary.v2.uploader.upload(thumbnail, { folder: 'courses' })

            data.thumbnail = {

                public_id: myCloud.public_id,

                url: myCloud.secure_url

            }

        }

        if (thumbnail.startsWith("https")) {

            data.thumbnail = {

                public_id: courseData?.thumbnail.public_id,
                url: courseData?.thumbnail.url

            }

        }

        const course = await courseModel.findByIdAndUpdate(courseId, { $set: data }, { new: true })

        res.status(201).json({
            success: true,
            message: 'Course updated successfully',
            course
        })

    } catch (error: any) {

        return next(new ErrorHandler(error.message, 500))

    }

})

//get single course - without purchasing
export const getSingleCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    try {

        const courseId = req.params.id

        const isCacheExist = await redis.get(courseId)

        // console.log('hitting redis');

        if (isCacheExist) {

            const course = JSON.parse(isCacheExist)

            res.status(200).json({
                success: true,
                course
            })

        } else {

            const course = await courseModel.findById(req.params.id).select('-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links')

            await redis.set(courseId, JSON.stringify(course), 'EX', 604800)

            // console.log('hitting mongo');

            res.status(200).json({
                success: true,
                course
            })

        }

    } catch (error: any) {

        return next(new ErrorHandler(error.message, 500))

    }

})

//get all courses - without purchasing
export const getAllCourses = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    try {

        const isCacheExist = await redis.get("allCourses")

        // console.log('hitting redis'); 

        if (isCacheExist) {

            const courses = JSON.parse(isCacheExist)

            res.status(200).json({
                success: true,
                courses
            })

        } else {

            const courses = await courseModel.find().select('-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links')

            await redis.set("allCourses", JSON.stringify(courses))

            // console.log('hitting mongo');

            res.status(200).json({
                success: true,
                courses
            })

        }

    } catch (error: any) {

        return next(new ErrorHandler(error.message, 500))

    }

})

//get course content - only for valid user
export const getCourseByUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    try {

        const userCourseList = req.user?.courses

        const courseId = req.params.id

        const courseExists = userCourseList?.find((course: any) => course._id.toString() === courseId)

        if (!courseExists) {

            return next(new ErrorHandler('You are not eligible to access this course', 403))

        }

        const course = await courseModel.findById(courseId)

        const content = course?.courseData

        res.status(200).json({
            success: true,
            content
        })

    } catch (error: any) {

        return next(new ErrorHandler(error.message, 500))

    }

})

//add question in course
export const addQuestion = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { question, courseId, contentId } = req.body as IAddQuestionData

        const course = await courseModel.findById(courseId)

        if (!mongoose.Types.ObjectId.isValid(contentId)) {

            return next(new ErrorHandler('Invalid content id', 400))

        }

        const courseContent = course?.courseData?.find((item: any) => item._id.equals(contentId))

        if (!courseContent) {

            return next(new ErrorHandler('Invalid content id', 400))

        }

        //create a new question object
        const newQuestion: any = {
            user: req.user,
            question,
            questionReplies: []
        }

        //add this question to our course content
        courseContent.questions.push(newQuestion)

        await notificationModel.create({
            user: req.user?._id,
            title: 'New Question Receiced',
            message: `You have a new question in ${courseContent?.title}`
        })

        //save the updated course
        await course?.save()

        res.status(200).json({
            success: true,
            course
        })

    } catch (error: any) {

        return next(new ErrorHandler(error.message, 500))

    }

})

//add answer in course question
export const addAnswer = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { answer, courseId, contentId, questionId } = req.body as IAddAnswerData

        const course = await courseModel.findById(courseId)

        if (!mongoose.Types.ObjectId.isValid(contentId)) {

            return next(new ErrorHandler('Invalid content id', 400))

        }

        const courseContent = course?.courseData?.find((item: any) => item._id.equals(contentId))

        if (!courseContent) {

            return next(new ErrorHandler('Invalid content id', 400))

        }

        const question = courseContent?.questions?.find((item: any) => item._id.equals(questionId))

        if (!question) {

            return next(new ErrorHandler('Invalid question id', 400))

        }

        //create new answer object
        const newAnswer: any = {
            user: req.user,
            answer,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        //add  this answer to our course content
        question.questionReplies?.push(newAnswer)

        await course?.save()

        if (req.user?._id === question.user._id) {

            //create a notification
            await notificationModel.create({
                user: req.user?._id,
                title: 'New Question Reply Receiced',
                message: `You have a new question reply in ${courseContent?.title}`
            })


        } else {

            const data = {
                name: question.user.name,
                title: courseContent.title
            }

            const html = await ejs.renderFile(path.join(__dirname, "../ejs/mails/question-reply.ejs"), data)

            try {

                await sendMail({

                    email: question.user.email,
                    subject: "Question Reply",
                    template: "question-reply.ejs",
                    data

                })

            } catch (error: any) {

                return next(new ErrorHandler(error.message, 500))

            }

        }

        res.status(200).json({
            success: true,
            course
        })

    } catch (error: any) {

        return next(new ErrorHandler(error.message, 500))

    }

})

//add review in course 
export const addReview = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    try {

        const userCourseList = req.user?.courses

        const courseId = req.params.id

        //check if courseId already exist in userCourseList base on _id
        const courseExists = userCourseList?.some((course: any) => course._id.toString() === courseId.toString())

        if (!courseExists) {

            return next(new ErrorHandler('You are not eligible to access this course', 403))

        }

        const course = await courseModel.findById(courseId)

        const { review, rating } = req.body as IAddReviewData

        const reviewData: any = {
            user: req.user,
            comment: review,
            rating
        }

        course?.reviews.push(reviewData)

        let avg = 0

        course?.reviews.forEach((rev: any) => { avg += rev.rating })

        if (course) {

            course.ratings = avg / course.reviews.length

        }

        await course?.save()

        await redis.set(courseId, JSON.stringify(course), 'EX', 604800)

        //create notification
        await notificationModel.create({
            user: req.user?._id,
            title: "New Review Recieved",
            message: `${req.user?.name} has given a review in ${course?.name}`
        })

        res.status(200).json({
            success: true,
            course
        })

    } catch (error: any) {

        return next(new ErrorHandler(error.message, 500))

    }

})

//add reply in review
export const addReplyToReview = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { comment, courseId, reviewId } = req.body as IAddReplyToReviewData

        const course = await courseModel.findById(courseId)

        if (!course) {

            return next(new ErrorHandler('Course not found', 404))

        }

        const review = course?.reviews?.find((rev: any) => rev._id.toString() === reviewId)

        if (!review) {

            return next(new ErrorHandler('Course not found', 404))

        }

        const replyData: any = {
            user: req.user,
            comment,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        if (!review.commentReplies) {

            review.commentReplies = []

        }

        review.commentReplies?.push(replyData)

        await course?.save()

        await redis.set(courseId, JSON.stringify(course), 'EX', 604800)

        res.status(200).json({
            success: true,
            course
        })

    } catch (error: any) {

        return next(new ErrorHandler(error.message, 500))

    }

})

//get all course - only for admin
export const getAllCoursesAdmin = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    try {

        getAllCoursesAdminService(res)

    } catch (error: any) {

        return next(new ErrorHandler(error.message, 400))

    }

})

//delete course - only for admin
export const deleteCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { id } = req.params

        const course = await courseModel.findById(id)

        if (!course) {

            return next(new ErrorHandler('Course not found', 404))

        }

        await course.deleteOne({ id })

        await redis.del(id)

        res.status(200).json({
            success: true,
            message: "Course deleted successfully"
        })

    } catch (error: any) {

        return next(new ErrorHandler(error.message, 400))

    }


})

export const generateVideoUrl = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { videoId } = req.body

        const response = await axios.post(
            `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
            { ttl: 300 },
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Apisecret ${process.env.VDOCIPHER_API_SECRET}`
                }
            }
        )

        res.json(response.data)

    } catch (error: any) {

        return next(new ErrorHandler(error.message, 400))

    }

})