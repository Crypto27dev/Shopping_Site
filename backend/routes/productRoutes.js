import Product from '../models/Product.js'
import asyncHandler from 'express-async-handler'
import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get(
  '/',
  asyncHandler(async (req, res) => {
    try {
      const data = await Product.find()
      if (data) {
        res.status(200).json(data)
      }
    } catch (error) {
      res.status(403).json(error)
    }
  })
)

router.get(
  '/category/:categoryName/:cost',
  asyncHandler(async (req, res) => {
    try {
      const data = await Product.find({
        category: req.params.categoryName,

        discountedCost: { $lt: req.params.cost },
      })
      if (data) {
        res.status(200).json(data)
      }
    } catch (error) {
      res.status(403).json(error)
    }
  })
)

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    try {
      const data = await Product.findOne({ _id: req.params.id })
      if (data) {
        res.status(200).json(data)
      }
    } catch (error) {
      res.status(403).json(error)
    }
  })
)

router.get(
  '/subcategory/:subcategoryName/:cost',
  asyncHandler(async (req, res) => {
    try {
      const data = await Product.find({
        subCategory: req.params.subcategoryName,

        discountedCost: { $lt: req.params.cost },
      })
      if (data) {
        res.status(200).json(data)
      }
    } catch (error) {
      res.status(403).json(error)
    }
  })
)

router.get(
  '/search/:productName',
  asyncHandler(async (req, res) => {
    try {
      const data = await Product.find({
        brandName: { $regex: req.params.productName, $options: '$i' },
      })
      if (data) {
        res.status(200).json(data)
      }
    } catch (error) {
      res.status(403).json(error)
    }
  })
)

router.post(
  '/:id/reviews',
  protect,
  asyncHandler(async (req, res) => {
    const { stars, description } = req.body
    const product = await Product.findById(req.params.id)
    if (product) {
      const review = {
        reviewedBy: req.user.name,
        stars: Number(stars),
        description,
        user: req.user._id,
      }
      product.reviews.push(review)
      product.stars =
        product.reviews.reduce((acc, item) => item.stars + acc, 0) /
        product.reviews.length
      await product.save()
      res.status(201).json({ message: 'Review added' })
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })
)
export default router
