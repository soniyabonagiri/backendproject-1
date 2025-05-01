import express from 'express'
import authMiddleware from '../auth.js'
import { placeOrder, useorders } from '../controller/Ordercontroller.js'




const orderRouter= express.Router();


orderRouter.post('/place',authMiddleware,placeOrder)

orderRouter.post('/useorders',authMiddleware,useorders)


export default orderRouter
