import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'

import CreateClient from './routes/client.route.js'

// import SignIn from './routes/client.route.js'
import clientRoutes from './routes/client.route.js'

import bookrouter from './routes/book.route.js'
import cookieParser from 'cookie-parser'
// Load environment variables from .env file
dotenv.config()

// Initialize Express app
const app = express()

// Connect to MongoDB
connectDB()

// Body parser middleware (allows your app to read JSON payloads)
app.use(express.json())
app.use(cookieParser())

///////connecting client through cors
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.get('/', (req, res) => {
  res.send('API is running and connected to DB!')
})


app.use('/api/v1/client',CreateClient)

// app.use('/api/v1/auth',SignIn)

app.use('/api/user', clientRoutes);

////////new book add///

app.use('/api/v1/book',bookrouter)



///////start server///
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})


