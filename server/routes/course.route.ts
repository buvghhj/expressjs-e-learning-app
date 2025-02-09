import express from 'express'
import { addAnswer, addQuestion, addReplyToReview, addReview, deleteCourse, editCourse, generateVideoUrl, getAllCourses, getAllCoursesAdmin, getCourseByUser, getSingleCourse, uploadCourse } from '../controllers/course.controller'
import { authorizeRoles, isAuthenticated } from '../middlewares/auth'
import { updateAccessToken } from '../controllers/user.controller'

const courseRouter = express.Router()

courseRouter.post('/create-course', isAuthenticated, authorizeRoles("admin"), uploadCourse)

courseRouter.put('/edit-course/:id', updateAccessToken, isAuthenticated, authorizeRoles("admin"), editCourse)

courseRouter.get('/get-course/:id', getSingleCourse)

courseRouter.get('/get-courses', getAllCourses)

courseRouter.get('/get-course-content/:id', updateAccessToken, isAuthenticated, getCourseByUser)

courseRouter.put('/add-question', updateAccessToken, isAuthenticated, addQuestion)

courseRouter.put('/add-answer', updateAccessToken, isAuthenticated, addAnswer)

courseRouter.put('/add-review/:id', updateAccessToken, isAuthenticated, addReview)

courseRouter.put('/add-reply', updateAccessToken, isAuthenticated, authorizeRoles("admin"), addReplyToReview)

courseRouter.get('/get-courses-admin', updateAccessToken, isAuthenticated, authorizeRoles("admin"), getAllCoursesAdmin)

courseRouter.delete('/delete-course/:id', updateAccessToken, isAuthenticated, authorizeRoles("admin"), deleteCourse)

courseRouter.post('/getVdoCipherOTP', generateVideoUrl)

export default courseRouter