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

//delete product

router.delete(
  '/product/:id',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    try {
      await Product.findByIdAndDelete({ _id: req.params.id })

      res.status(200).json('success')
    } catch (error) {
      res.status(403).json(error)
    }
  })
)
//update product

router.put(
  '/product/:id',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    try {
      const {
        brandName,
        image,
        brand,
        category,
        subCategory,
        description,
        discount,
        cost,
        quantity,
      } = req.body
      const product = await Product.findById({ _id: req.params.id })
      if (product) {
        ;(product.brandName = brandName || product.brandName),
          (product.image = image || product.image),
          (product.brand = brand || product.brand),
          (product.category = category || product.category),
          (product.subCategory = subCategory || product.subCategory),
          (product.description = description || product.description),
          (product.discount = discount || product.discount),
          (product.cost = cost || product.cost),
          (product.quantity = quantity || product.quantity),
          (product.discountedCost = product.discount
            ? product.cost - (product.discount * product.cost) / 100
            : product.cost)
        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)
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
