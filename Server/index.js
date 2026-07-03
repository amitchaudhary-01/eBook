import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'

// Load environment variables from .env file
dotenv.config()

// Initialize Express app
const app = express()

// Connect to MongoDB
connectDB()

// Body parser middleware (allows your app to read JSON payloads)
app.use(express.json())

///////connecting client through cors
app.use(cors({
    origin:" http://localhost:5173/"
}))

app.get('/', (req, res) => {
  res.send('API is running and connected to DB!')
})

///////start server///
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})


