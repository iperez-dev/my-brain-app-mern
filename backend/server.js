require('dotenv').config()
const express = require('express')
const mongoose = require("mongoose")
const workoutRoutes = require('./router/workoutRouter')
const userRoutes = require('./router/userRouter')
const cors = require('cors')
const multer = require("multer")


//express app
const app = express()

//use CORS
app.use(cors());

//Middleware
app.use(express.json());


app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// API Route
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)


//MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('connected to MONGO-DB')
        //Listen to PORT
        app.listen(process.env.PORT, () => {
            console.log(`App running on PORT ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })





