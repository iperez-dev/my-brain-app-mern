// Dependencies
const express = require('express')
const connectToDb = require('./config/connectToDb')
const mainRoutes = require('./router/mainRouter')
const memoryRoutes = require('./router/memoryRouter')
const cors = require('cors')
const multer = require("multer")
const mongoose = require ('mongoose')
const passport = require ('passport')
const session = require ('express-session')
const MongoStore = require('connect-mongo')
const flash = require('express-flash')

//express app
const app = express()

// use Environment Variables
require('dotenv').config();

// Passport config
require('./config/passport')(passport)

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

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongoUrl: process.env.MONGO_URI }),
    })
  )

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Flash
app.use(flash())

// User Routes
app.use('/', mainRoutes)

// API Route
app.use('/api/memories', memoryRoutes)

//Listen to PORT
app.listen(process.env.PORT, () => {
    console.log(`App running on PORT ${process.env.PORT}`)
})
  





