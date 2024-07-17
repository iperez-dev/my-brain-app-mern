require('dotenv').config()
const express = require('express')
const connectToDb = require('./config/connectToDb')
const memoryRoutes = require('./router/memoryRouter')
const cors = require('cors')
const multer = require("multer")
const authRoutes = require('./router/authRouter')
const passport = require ("passport")

//express app
const app = express()

// use Environment Variables
require('dotenv').config();

// Google Strategy
require('./config/strategies/google')

//use CORS
app.use(cors());

//Middleware
app.use(express.json());

//use Passport
app.use(passport.initialize())

// Connect to DB
connectToDb()

// Middleware for logging request paths and methods
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// auth Route
app.use('/api/auth', authRoutes)

// API Route
app.use('/api/memories', memoryRoutes)

//Listen to PORT
app.listen(process.env.PORT, () => {
    console.log(`App running on PORT ${process.env.PORT}`)
})
  





