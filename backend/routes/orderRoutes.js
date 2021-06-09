import express from 'express'
import asyncHandler from 'express-async-handler'
import Order from '../models/Order.js'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()
router.post(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body
    if (orderItems && orderItems.length === 0) {
      res.status(400)
      throw new Error('No order items')
      return
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })
      const createdOrder = await order.save()

      res.status(201).json(createdOrder)
    }
  })
)

router.get(
  '/myorders',
  protect,
  asyncHandler(async (req, res) => {
    const data = await Order.find({ user: req.user._id })
    console.log('Data is', data)
    if (data) {
      res.status(201).json(data)
    } else {
      res.status(403)
      throw new Error('You have no orders yet')
    }
  })
)
export default router
