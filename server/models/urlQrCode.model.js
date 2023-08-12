const mongoose = require("mongoose")

const urlQrCodeSchema = new mongoose.Schema({
    longURL: {type: String, required: true, unique: true},
    qrCode: {type: Buffer, required: true},
})

const UrlQrCodeModel = mongoose.model('urlQrCode', urlQrCodeSchema)

module.exports = UrlQrCodeModel