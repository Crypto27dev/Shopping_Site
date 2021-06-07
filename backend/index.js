import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
dotenv.config()
connectDB()

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.json('successfully implemented backend')
})
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  console.log("err",err)
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
})
app.listen(process.env.PORT, () => {
  console.log(`Backend running on port ${process.env.PORT}`)
})
