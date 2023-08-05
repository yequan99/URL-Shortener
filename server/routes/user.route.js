const router = require('express').Router()
const bcrypt = require("bcryptjs")
let User = require('../models/user.model')

router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.post('/add', async (req, res) => {
    // Check if username exists
    const usernameExist = await User.findOne({ username: req.body.username})

    if (usernameExist) {
        res.status(400).send("Username already exists")
        return
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({
        username: req.body.username,
        salt: salt,
        hash: hashedPassword,
    })

    try {
        const saveUser = await newUser.save()
        res.status(200).json("User Created!")
    } catch (err) {
        res.status(400).json('[User Creation] Error: ', + err)
    }
})

module.exports = router