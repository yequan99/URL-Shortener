const mongoose = require("mongoose")

const userURLSchema = new mongoose.Schema({
    userID: {type: String, required: true},
    longurl: {type: String, required: true},
    shorturl: {type: String, required: true},
    urlcode: {type: String, required: true},
    qrCode: {type: Buffer, required: true},
}, {
    timestamps: true,
})

const UserURL = mongoose.model('userURL', userURLSchema)

module.exports = UserURL