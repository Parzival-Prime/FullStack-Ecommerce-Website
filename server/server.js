import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import connectDB from './db/db.js'
import authRoute from './routes/auth.router.js'

//configure env
dotenv.config()

//connect Database
connectDB()

//rest object
const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth', authRoute)

app.get('/', (req, res)=>{
    res.send('<h1>API is running</h1>')
})

//PORT
const PORT = process.env.PORT

//run listner
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})