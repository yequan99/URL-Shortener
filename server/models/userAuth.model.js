const mongoose = require("mongoose")

const userAuthSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    token: {type: String, required: true},
}, {
    timestamps: true,
})

const UserAuth = mongoose.model('userAuth', userAuthSchema)

module.exports = UserAuth