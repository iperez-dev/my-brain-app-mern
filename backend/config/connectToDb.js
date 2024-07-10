// Dependencies
const mongoose = require("mongoose")

// Environment variables
if( process.env.NODE_ENV != "production" ){
    require("dotenv").config()
}

// Connect to DB 
async function connectToDb () {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to DB")
    } catch(err){
        console.log(err)
    }
}

module.exports = connectToDb