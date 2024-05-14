import mongoose, { Model, Schema } from "mongoose";
import { IOrder } from "../interfaces/orderModel.interface";

const orderSchema: Schema<IOrder> = new mongoose.Schema({

    courseId: {
        type: String,
        required: true
    },

    userId: {
        type: String,
        required: true
    },

    payment_infor: {
        type: Object,
        // required: true
    }

}, { timestamps: true })

export const orderModel: Model<IOrder> = mongoose.model('Order', orderSchema)