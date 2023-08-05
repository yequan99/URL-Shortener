const router = require('express').Router()
const bcrypt = require("bcryptjs")
let User = require('../models/user.model')

router.post('/', async (req, res) => {
    // Check if username exists
    const user = await User.findOne({ username: req.body.username})

    if (!user) {
        res.status(400).send("Username does not exist")
        return
    }

    const validPassword = await bcrypt.compare(req.body.password, user.hash)
    if (!validPassword) {
        res.status(400).send("Invalid Password")
        return
    }
    res.status(200).send("Login success!")
})

module.exports = router