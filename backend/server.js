require('dotenv').config()
const express = require ('express')
const mongoose = require("mongoose")
const workoutRoutes = require ('./router/workoutRouter')
const cors = require('cors')

//express app
const app = express()

//use CORS
app.use(cors());

//Middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//route
app.use('/api/workouts', workoutRoutes)


//MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('connected to MONGO-DB')
    //Listen to PORT
    app.listen(process.env.PORT, () => {
        console.log(`App running on PORT ${process.env.PORT}`)
    })
})
.catch((error) =>{
    console.log(error)
})





