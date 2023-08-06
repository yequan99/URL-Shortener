const router = require('express').Router()
let UserURLModel = require('../models/userURL.model')

router.get('/', async (req, res) => {
    try {
        // Get long url to be redirected
        const path = req.originalUrl
        const longurl = await UserURLModel.findOne({ urlcode: path.substring(1) })
        // Remove "http://" or "https://" from url if exists
        const removeHttp = longurl.longurl.replace(/^(https?:\/\/)/, '')
        const redirectUrl = 'https://' + removeHttp
        res.status(301).redirect(redirectUrl)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ 'Error': 'Server error' })
    }
})

module.exports = router