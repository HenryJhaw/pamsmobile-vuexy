require('dotenv').config()

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const path = require('path')
const corsOptions = require('./config/cors')
const connectDB = require('./config/database')
const credentials = require('./middleware/credentials')
const errorHandlerMiddleware = require('./middleware/error_handler')

const app = express()
const PORT = 3500

connectDB()

// Allow Credentials
app.use(credentials)

// CORS
app.use(cors(corsOptions))

//application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// application/json response
app.use(express.json())

//middleware for cookies
app.use(cookieParser())

// static files
app.use('/static', express.static(path.join(__dirname, 'public')))

//Routes
app.use('/api/auth', require('./routes/api/auth'))

//Default Error Handler
app.use(errorHandlerMiddleware)

app.all('*', (req, res) => {
  res.status(404).json({ message: 'Not Found' })
})

mongoose.connection.once('open', () => {
  console.log('DB connected')
  app.listen(PORT, () => { console.log(`Listening on port ${PORT}`) })
})
