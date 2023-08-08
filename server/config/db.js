const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
    try {
        const uri = process.env.ATLAS_URI
        await mongoose.connect(uri, {
            useNewUrlParser: true
        })
        console.log('MongoDB connection established...')
    } catch (err) {
        console.error("MongoDB connection failed:", err.message)
        process.exit(1)
    }
}

module.exports = connectDB