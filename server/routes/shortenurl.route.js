const router = require('express').Router()
const auth = require('../middleware/auth')
let UserURL = require('../models/userURL.model')

router.post('/', async (req, res) => {
    try {
        const longURL = req.body.longURL
        console.log("Received:", longURL)
        res.status(200).json({ "shortURL": "www.ntu.com" })
    } catch (err) {
        console.error("Error: ", err)
        res.status(500).json({ "Error": "Server Error" })
    }
})

module.exports = router