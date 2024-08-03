import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import Stripe from 'stripe';
import axios from 'axios'
import cookieParser from 'cookie-parser'
import authRoute from './routes/auth.router.js'
import productRoute from './routes/product.router.js'
import categoryRoute from './routes/category.router.js'
import paymentRoute from './routes/payment.router.js'
import contactRoute from './routes/Contact.router.js'

//rest object
const app = express()

// axiso Instance
const axiosInstance = axios.create({
  withCredentials: true,
})

axiosInstance.defaults.headers.common["Content-Type"] = "application/json"
axiosInstance.defaults.headers.common["Accept"] = "application/json"

export { axiosInstance }

// Stripe Configuration
export const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);

//middlewares
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: 'include'
}))
app.use(express.json())
app.use(express.static("public"))
app.use(morgan('dev'))
app.use(cookieParser())


//routes
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/product', productRoute)
app.use('/api/v1/category', categoryRoute)
app.use('/api/v1/payment', paymentRoute)
app.use('/api/v1/contact', contactRoute)

export { app }