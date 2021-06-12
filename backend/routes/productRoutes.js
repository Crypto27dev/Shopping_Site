import Product from '../models/Product.js'
import asyncHandler from 'express-async-handler'
import express from 'express'
import dotenv from 'dotenv'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { protect, admin } from '../middleware/authMiddleware.js'
import cloudinary from 'cloudinary'
dotenv.config()
const cloudinaryconfig = cloudinary.v2

cloudinaryconfig.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('value', path.extname(file.originalname))
    console.log('file', file)
    cb(null, 'Images')
  },
  filename: function (req, file, cb) {
    console.log('path', path)
    // console.log('value', path.extname(file.originalname))
    cb(null, Date.now() + path.extname(file.originalname))
  },
})
const fileFilter = async (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png']
  if (allowedFileTypes.includes(file.mimetype)) {
    console.log('reached inside multer')
    cb(null, true)
  } else {
    req.filevalidationerror = 'Unsupported file format'
    return cb(null, req.filevalidationerror, false)
  }
}
let upload = multer({ storage, fileFilter })

const router = express.Router()

router.route('/uploadImage').post(
  upload.single('image'),
  protect,
  admin,
  asyncHandler(async (req, res) => {
    console.log('reached here')

    const photopath = req.file.path

    if (req.filevalidationerror) {
      fs.unlink(photopath, function (err) {
        console.log('reached here')
        if (err) return console.log(err)
        console.log('file deleted successfully')
      })
      res.status(401).json({ msg: req.filevalidationerror })
    } else {
      try {
        await cloudinary.uploader.upload(photopath, function (result, error) {
          console.log('result', result)
          const url = result.url
          fs.unlink(photopath, function (err) {
            console.log('reached here')
            if (err) return console.log(err)
            console.log('file deleted successfully')
          })
          res.status(201)
          res.json(url)
        })
      } catch (error) {
        res.status(400).json({ msg: error })
      }
    }
  })
)
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
      console.log('id', req.params.id)
      console.log(req.body)
      const product = await Product.findById({ _id: req.params.id })
      // console.log('product is', product)
      if (product) {
        ;(product.brandName = brandName),
          (product.image = image || product.image),
          (product.brand = brand),
          (product.category = category),
          (product.subCategory = subCategory),
          (product.description = description),
          (product.discount = discount),
          (product.cost = cost),
          (product.quantity = quantity),
          (product.discountedCost = product.discount
            ? product.cost - (product.discount * product.cost) / 100
            : product.cost)
        const updatedProduct = await product.save()
        if (updatedProduct) {
          res.status(201).json('Successfully updated')
        } else {
          res.status(401).json(error)
        }
      }
    } catch (error) {
      res.status(403).json(error)
    }
  })
)

// create a new product

router.post(
  '/productCreate',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    try {
      console.log('reached')
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
      console.log(req.body)

      const discountedCost = discount ? cost - (discount * cost) / 100 : cost

      await Product.create({
        user: req.user,
        brandName,
        image,
        brand,
        category,
        subCategory,
        description,
        discount,
        cost,
        quantity,
        discountedCost,
      })

      res.status(201).json('Product created successfully')
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
