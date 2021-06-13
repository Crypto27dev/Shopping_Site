import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/User.js'
import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'

import capitalize from '../utils/capitalize.js'
const router = express.Router()

router.post(
  '/register/:funcNumber',
  asyncHandler(async (req, res) => {
    console.log('hello')
    const { name, email, password } = req.body

    console.log(req.params.funcNumber)
    const operation = req.params.funcNumber
    if (operation == 'formfillup') {
      console.log('formfillup')
      const userExists = await User.findOne({ email })

      if (userExists) {
        res.status(400)
        throw new Error('User already exists')
      }

      const user = await User.create({
        name,
        email,
        password,
      })

      if (user) {
        res.status(201).json({
          _id: user._id,
          name: capitalize(user.name),
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        })
      } else {
        res.status(400)
        throw new Error('Invalid user data')
      }
    } else {
      console.log('googlesignin')
      console.log(req.body)
      const userExists = await User.findOne({ email })
      if (userExists) {
        //code goes here
        console.log('user already exists')
        res.status(201).json({
          _id: userExists._id,
          name: userExists.name,
          email: userExists.email,
          isAdmin: userExists.isAdmin,
          token: generateToken(userExists._id),
        })
      } else {
        const password = email + Date.now()
        const user = await User.create({
          name,
          email,
          password,
        })

        if (user) {
          res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
          })
        } else {
          res.status(400)
          throw new Error('Invalid user data')
        }
      }
    }
  })
)

router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
  })
)
//update user

router.put(
  '/updateUser',
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email

      if (req.body.password) {
        user.password = req.body.password
      }
      const updatedUser = await user.save()

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      })
    } else {
      res.status(401)
      console.log(error)
      res.json('error')
    }
  })
)

router.get(
  '/',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const users = await User.find().select('-password')

    if (users) {
      res.json(users)
    } else {
      res.status(401)
      throw new Error('No users found')
    }
  })
)
router.get(
  '/user/:id',
  protect,
  asyncHandler(async (req, res) => {
    console.log("back")
    const user = await User.findById({ _id: req.params.id }).select('-password')

    if (user) {
      res.json(user)
    } else {
      res.status(401)
      throw new Error('No users found')
    }
  })
)
router.delete(
  '/:id',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    try {
      await User.findByIdAndDelete({ _id: req.params.id })
      res.status(201).json('Successfully deleted')
    } catch (error) {
      res.status(401)
      throw new Error('No users found')
    }
  })
)
export default router
