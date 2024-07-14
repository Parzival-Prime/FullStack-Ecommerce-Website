import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoute from './routes/auth.router.js'

//rest object
const app = express()


//middlewares
app.use(cors({ origin: process.env.CORS_ORIGIN }))
app.use(express.json())
app.use(express.static("public"))
app.use(morgan('dev'))
app.use(cookieParser())

//routes
app.use('/api/v1/auth', authRoute)

export { app }