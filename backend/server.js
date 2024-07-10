require('dotenv').config()
const express = require('express')
const connectToDb = require('./config/connectToDb')
const memoryRoutes = require('./router/memoryRouter')
const cors = require('cors')
const multer = require("multer")


//express app
const app = express()

// use Environment Variables
require('dotenv').config();

//use CORS
app.use(cors());

//Middleware
app.use(express.json());

// Connect to DB
connectToDb()

// Middleware for logging request paths and methods
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// API Route
app.use('/api/memories', memoryRoutes)

//Listen to PORT
app.listen(process.env.PORT, () => {
    console.log(`App running on PORT ${process.env.PORT}`)
})
  





