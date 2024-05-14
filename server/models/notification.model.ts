import mongoose, { Model, Schema } from "mongoose";
import { INotification } from "../interfaces/notificationModel.interface";

const notificationSchema: Schema<INotification> = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'unread'
    }

}, { timestamps: true })

export const notificationModel: Model<INotification> = mongoose.model('Notification', notificationSchema)