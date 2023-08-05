const mongoose = require("mongoose")

const userSessionTokenSchema = new mongoose.Schema({
    userID: {type: String, required: true, unique: true},
    token: {type: String, required: true},
}, {
    timestamps: true,
})

const UserSessionTokenModel = mongoose.model('userSessionToken', userSessionTokenSchema)

module.exports = UserSessionTokenModel