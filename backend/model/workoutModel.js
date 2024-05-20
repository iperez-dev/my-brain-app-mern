const mongoose = require("mongoose")

const Schema = mongoose.Schema

const workoutSchema = new Schema ({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Workout', workoutSchema)