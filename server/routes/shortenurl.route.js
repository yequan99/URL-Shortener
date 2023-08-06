const router = require('express').Router()
const shortid = require('shortid')
const auth = require('../middleware/auth')
let UserURLModel = require('../models/userURL.model')

router.get('/', async (req, res) => {
    try {
        const userID = req.header("x-user-id")
        const userURL = await UserURLModel.find({ userID: userID })
        res.status(200).json(userURL)
    } catch (err) {
        console.error("Error: ", err)
        res.status(500).json({ "Error": "Server Error" })
    }
})

router.post('/shorten', async (req, res) => {
    try {
        const userID = req.header("x-user-id")
        const longURL = req.body.longURL

        // Check if url already exists in user DB
        const existUrl = await UserURLModel.findOne({ userID: userID, longurl: longURL })
        if (existUrl) {
            // Return stored short url
            const shortURL = existUrl.shorturl
            res.status(200).json({ "shortURL": shortURL })
        } else {
            // Generate unique short url code per user
            let urlCode = shortid.generate()

            const searchOtherUser = await UserURLModel.find({ longurl: longURL })
            let urlCodeArr = []
            searchOtherUser.map((item) => {
                urlCodeArr.push(item.urlcode)
            })
            // Ensure no duplicate url code amongst different users with same link
            while (urlCodeArr.includes(urlCode)) {
                urlCode = shortid.generate()
            }

            const shortURL = process.env.BASE_URL + '/' + urlCode
            const newUserURL = new UserURLModel({
                userID: userID,
                longurl: longURL,
                shorturl: shortURL,
                urlcode: urlCode
            })

            const saveUserURL = await newUserURL.save()
            res.status(200).json({ "shortURL": shortURL })
        }
    } catch (err) {
        console.error("Error: ", err)
        res.status(500).json({ "Error": "Server Error" })
    }
})

router.post('/delete', async (req, res) => {
    try {
        const itemID = req.body.itemID

        // Delete item from DB
        const deleteURL = await UserURLModel.deleteOne({ _id: itemID })

        res.status(200).json({ "msg": "Deleted Successfully" })
    } catch (err) {
        console.error("Error: ", err)
        res.status(500).json({ "Error": "Server Error" })
    }
})

module.exports = router