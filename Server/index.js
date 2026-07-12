import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import connectDB from './config/db.js'

import clientRoutes from './routes/client.route.js'
import bookrouter from './routes/book.route.js'
import cookieParser from 'cookie-parser'

// Load environment variables from .env file
dotenv.config()

// Initialize Express app & HTTP Server
const app = express()
const server = http.createServer(app)

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
})

// Attach socket instance so controllers can access it via req.app.get('io')
app.set('io', io)

io.on('connection', (socket) => {
  console.log('Client connected via Socket.io:', socket.id)
})

// Connect to MongoDB
connectDB()

// Body parser middleware
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

app.use('/api/v1/client', clientRoutes)

////////new book add///
app.use('/api/v1/book', bookrouter)

///////start server///
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})