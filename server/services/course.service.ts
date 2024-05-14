import { Response } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import { courseModel } from "../models/course.model";

//create course
export const createCourse = CatchAsyncError(async (data: any, res: Response) => {

    const course = await courseModel.create(data)

    res.status(201).json({
        success: true,
        course
    })

})

//get all courses - only for admin
export const getAllCoursesAdminService = async (res: Response) => {

    const courses = await courseModel.find().sort({ createdAt: -1 })

    res.status(200).json({
        success: true,
        courses
    })

}

