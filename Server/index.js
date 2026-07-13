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

// Allowed origins for CORS (local dev + deployed frontend)
const allowedOrigins = [
  "http://localhost:5173",
  "https://ebook-3xuy.onrender.com"
]

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
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

// Body parser & Cookie middleware
app.use(express.json())
app.use(cookieParser())

// Express CORS Configuration
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}))

app.get('/', (req, res) => {
  res.send('API is running and connected to DB!')
})

app.use('/uploads', express.static('uploads'))
app.use('/api/v1/client', clientRoutes)
app.use('/api/v1/book', bookrouter)

// Dynamic PORT assignment for Render
const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})