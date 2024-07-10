const mongoose = require("mongoose")

const Schema = mongoose.Schema

const memorySchema = new Schema ({
    name: {
        type: String,
        require: true
    },
    stack: {
        type: String,
        require: true
    },
    features: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true
    },
    githubUrl: {
        type: String,
        require: true
    },
    cloudinaryId: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
    user_id: {
        type: String,
        require: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Memory', memorySchema)