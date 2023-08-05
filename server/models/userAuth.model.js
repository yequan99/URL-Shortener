const mongoose = require("mongoose")

const userAuthSchema = new mongoose.Schema({
    userID: {type: String, required: true, unique: true},
    hash: {type: String, required: true},
}, {
    timestamps: true,
})

const UserAuthModel = mongoose.model('userAuth', userAuthSchema)

module.exports = UserAuthModel