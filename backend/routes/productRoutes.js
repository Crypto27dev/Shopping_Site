import Product from '../models/Product.js'
import asyncHandler from 'express-async-handler'
import express from 'express'
const router = express.Router()

router.get(
  '/',
  asyncHandler(async (req, res) => {
    try {
      const data = await Product.find()
      if (data) {
        console.log('Data', data)
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
      console.log(req.params.cost)
      console.log(req.params.categoryName)

      const data = await Product.find({
        category: req.params.categoryName,

        cost: { $lt: req.params.cost },
      })
      if (data) {
        console.log('Data', data)
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
        console.log('Data', data)
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
    console.log('Sdfsd')
    try {
      const data = await Product.find({
        subCategory: req.params.subcategoryName,

        cost: { $lt: req.params.cost },
      })
      if (data) {
        console.log('Data', data)
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
    console.log('Sdfsd')
    console.log('productName', req.params.productName)
    try {
      const data = await Product.find({
        brandName: { $regex: req.params.productName, $options: '$i' },
      })
      if (data) {
        console.log('Data', data)
        res.status(200).json(data)
      }
    } catch (error) {
      res.status(403).json(error)
    }
  })
)
export default router
