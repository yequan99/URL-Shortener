const mongoose = require("mongoose")

const userURLSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    url: {type: String, required: true},
}, {
    timestamps: true,
})

const UserURL = mongoose.model('userURL', userURLSchema)

module.exports = UserURL