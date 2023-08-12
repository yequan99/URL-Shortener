const router = require('express').Router()
const mutexify = require('mutexify')
const shortid = require('shortid')
const QRCode = require('qrcode');
const lock = mutexify()

const auth = require('../middleware/auth')
let UserURLModel = require('../models/userURL.model')
let UrlArrayModel = require('../models/urlArray.model')
let UrlQrCodeModel = require('../models/urlQrCode.model')
const { ValidateURL, GenUniqueUrlCode } = require('../utils/utils')

router.get('/', auth, async (req, res) => {
    try {
        const userID = req.header("x-user-id")
        const userURL = await UserURLModel.find({ userID: userID })
        res.status(200).json(userURL)
    } catch (err) {
        console.error("[Retrieve URL Error] Unable to get user info: ", err.message)
        res.status(500).json({ "Error": "Server Error" })
    }
})

router.post('/shorten', auth, async (req, res) => {
    // Mutex lock to prevent race condition when assigning url code
    lock(async function(release) {
        try {
            const userID = req.header("x-user-id")
            const longURL = req.body.longURL
            
            // Validate URL
            const validate = ValidateURL(longURL)
            if (!validate){
                console.log("[URL Shorten] Invalid URL parsed")
                res.status(400).json({ "Error": "Invalid URL"})
            } else {
                // Check if url already exists in user DB
                const existUrl = await UserURLModel.findOne({ userID: userID, longurl: longURL })
                if (existUrl) {
                    // Return stored short url
                    const shortURL = existUrl.shorturl
                    res.status(200).json({ "shortURL": shortURL })
                } else {
                    // Generate unique short url code per user
                    const searchOtherUrlCode = await UrlArrayModel.findOne({ longurl: longURL })
                    var uniqueUrlCode = shortid.generate()
                    if (!searchOtherUrlCode) {
                        // Add new urlCode to array in db
                        const newUrlCodeArray = new UrlArrayModel({
                            longurl: longURL,
                            urlcode: [uniqueUrlCode]
                        })
                        const saveNewUrlArray = await newUrlCodeArray.save()
                    } else {
                        uniqueUrlCode = GenUniqueUrlCode(searchOtherUrlCode.urlcode, uniqueUrlCode)

                        let arr = searchOtherUrlCode.urlcode
                        arr.push(uniqueUrlCode)
                        const updateUrlArray = await UrlArrayModel.findOneAndUpdate(
                            { longurl: longURL },
                            { $set: { urlcode: arr } },
                            { upsert: true, new: true }
                        )
                    }
        
                    const shortURL = process.env.BASE_URL + '/' + uniqueUrlCode

                    // Check if QR Code exists
                    const getQrCodeID = await UrlQrCodeModel.findOne({ longURL: longURL })
                    let QrCode = ""

                    if (getQrCodeID) {
                        QrCode = getQrCodeID.qrCode
                    } else {
                        // Generate QR Code and store in DB
                        const qrCode = await QRCode.toBuffer(longURL)
                        const qrCodeData = new UrlQrCodeModel({
                            longURL: longURL,
                            qrCode: qrCode
                        })
                        const saveQrCode = await qrCodeData.save()
                        QrCode = qrCode
                    }

                    const newUserURL = new UserURLModel({
                        userID: userID,
                        longurl: longURL,
                        shorturl: shortURL,
                        urlcode: uniqueUrlCode,
                        qrCode: QrCode
                    })
    
                    const saveUserURL = await newUserURL.save()
                    res.status(200).json({ "shortURL": shortURL })
                }
            }
        } catch (err) {
            console.error("[Shorten URL Error] Unable to shorten url: ", err.message)
            res.status(500).json({ "Error": "Server Error" })
        } finally {
            release() //Release lock
        }
    })
    
})

router.post('/delete', auth, async (req, res) => {
    try {
        const itemID = req.body.itemID
        const longURL = req.body.longurl
        const urlCode = req.body.urlcode

        // Delete item from userURL DB
        const deleteURL = await UserURLModel.deleteOne({ _id: itemID })

        // Delete item from urlArray DB
        const getUrlArray = await UrlArrayModel.findOne({ longurl: longURL })
        let arr = getUrlArray.urlcode
        arr.remove(urlCode)

        if (arr.length === 0) {
            // Remove entire document if array is empty
            const deleteDoc = await UrlArrayModel.deleteOne({ longurl: longURL })
        } else {
            // Update document with new array
            const updateUrlArray = await UrlArrayModel.findOneAndUpdate(
                { longurl: longURL },
                { $set: { urlcode: arr } },
                { upsert: true, new: true }
            )
        }

        res.status(200).json({ "msg": "Deleted Successfully" })
    } catch (err) {
        console.error("[Delete URL Error] Unable to delete entry: ", err.message)
        res.status(500).json({ "Error": "Server Error" })
    }
})

module.exports = router