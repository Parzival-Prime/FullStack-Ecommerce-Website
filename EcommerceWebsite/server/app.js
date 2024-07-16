import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoute from './routes/auth.router.js'
import productRoute from './routes/product.router.js'
import categoryRoute from './routes/category.router.js'

//rest object
const app = express()

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

export { app }