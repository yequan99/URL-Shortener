const router = require('express').Router()
const mutexify = require('mutexify')
const lock = mutexify()

const auth = require('../middleware/auth')
let UserURLModel = require('../models/userURL.model')
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
                    const searchOtherUser = await UserURLModel.find({ longurl: longURL })
                    const uniqueUrlCode = GenUniqueUrlCode(searchOtherUser)
    
                    const shortURL = process.env.BASE_URL + '/' + uniqueUrlCode
                    const newUserURL = new UserURLModel({
                        userID: userID,
                        longurl: longURL,
                        shorturl: shortURL,
                        urlcode: uniqueUrlCode
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

        // Delete item from DB
        const deleteURL = await UserURLModel.deleteOne({ _id: itemID })

        res.status(200).json({ "msg": "Deleted Successfully" })
    } catch (err) {
        console.error("[Delete URL Error] Unable to delete entry: ", err.message)
        res.status(500).json({ "Error": "Server Error" })
    }
})

module.exports = router