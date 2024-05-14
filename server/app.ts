import express, { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { ErrorMiddleware } from './middlewares/error'
import userRouter from './routes/user.route'
import courseRouter from './routes/course.route'
import orderRouter from './routes/order.route'
import notificationRouter from './routes/notification.route'
import analyticsRouter from './routes/analytics.route'
import layoutRouter from './routes/layout.route'

export const app = express()

dotenv.config()

app.use(express.json({ limit: "50mb" }))
app.use(cors({ origin: process.env.ORIGIN, credentials: true }))
app.use(cookieParser())

//routes
app.use('/api/v1/user', userRouter)
app.use('/api/v1/course', courseRouter)
app.use('/api/v1/order', orderRouter)
app.use('/api/v1/notification', notificationRouter)
app.use('/api/v1/analytics', analyticsRouter)
app.use('/api/v1/layout', layoutRouter)

//testing api
app.get('/test', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ success: true, message: 'API is working' })
})

//unkown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any
    err.statusCode = 404
    next(err)
})

app.use(ErrorMiddleware)
