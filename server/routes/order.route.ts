import express from "express";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth";
import { createOrder, getAllOrders, newPayment, sendStripePublishableKey } from "../controllers/order.controller";
import { updateAccessToken } from "../controllers/user.controller";

const orderRouter = express.Router()

orderRouter.post('/create-order', isAuthenticated, createOrder)

orderRouter.get('/get-orders', updateAccessToken, isAuthenticated, authorizeRoles('admin'), getAllOrders)

orderRouter.get("/payment/stripepublishablekey", sendStripePublishableKey)

orderRouter.post("/payment", isAuthenticated, newPayment)

export default orderRouter