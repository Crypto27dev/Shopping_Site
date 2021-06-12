import express from 'express'
import asyncHandler from 'express-async-handler'
import Order from '../models/Order.js'
import Product from '../models/Product.js'

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
    if (data) {
      res.status(201).json(data)
    } else {
      res.status(403)
      throw new Error('You have no orders yet')
    }
  })
)
//get particular order by admin
router.get(
  '/admin/order/:id',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    console.log('Data is')

    const data = await Order.findById({ _id: req.params.id })
    if (data) {
      res.status(201).json(data)
    } else {
      res.status(403)
      throw new Error('Order not found')
    }
  })
)
router.get(
  '/admin/allorders',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const data = await Order.find()
    if (data) {
      res.status(201).json(data)
    } else {
      res.status(403)
      throw new Error('You have no orders till date admin')
    }
  })
)

router.put(
  '/admin/delivery/:id',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const order = await Order.findOne({ _id: req.params.id })
    if (order) {
      order.isDelivered = !order.isDelivered
      console.log(order.orderItems)
      const func = order.orderItems.map(async (item) => {
        const productinitial = await Product.findOne({ _id: item.product })
        const quantityProd = productinitial.quantity

        const product = await Product.findByIdAndUpdate(item.product, {
          $inc: {
            quantity: -item.qty,
          },
        })

        console.log('updated', product)
      })
      await order.save()
      res.status(201).json('Success')
    } else {
      res.status(401).json('Unauthorized')
    }
  })
)

router.put(
  '/admin/pay/:id',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const order = await Order.findOne({ _id: req.params.id })
    if (order) {
      order.isPaid = !order.isPaid
      await order.save()
      res.status(201).json('Success')
    } else {
      res.status(401).json('Unauthorized')
    }
  })
)
router.delete(
  '/admin/deleteorder/:id',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    try {
      await Order.findByIdAndRemove({ _id: req.params.id })

      res.status(201).json('Success')
    } catch (error) {
      res.status(401).json('Unauthorized')
    }
  })
)
export default router
