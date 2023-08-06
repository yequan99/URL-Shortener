const mongoose = require("mongoose")

const urlArraySchema = new mongoose.Schema({
    longurl: {type: String, required: true, unique: true},
    urlcode: {type: Array, required: true, unique: true},
})

const UserModel = mongoose.model('urlArray', urlArraySchema)

module.exports = UserModel