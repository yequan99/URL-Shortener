const router = require('express').Router()
const auth = require('../middleware/auth')
let UserURLModel = require('../models/userURL.model')

router.post('/shorten', async (req, res) => {
    try {
        const userID = req.header("x-user-id")
        const longURL = req.body.longURL
        console.log("Received:", longURL)

        const shortURL = "www.ntu.edu.sg"

        const newUserURL = new UserURLModel({
            userID: userID,
            longurl: longURL,
            shorturl: shortURL
        })

        const saveUserURL = await newUserURL.save()

        res.status(200).json({ "shortURL": shortURL })
    } catch (err) {
        console.error("Error: ", err)
        res.status(500).json({ "Error": "Server Error" })
    }
})

module.exports = router