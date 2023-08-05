const router = require('express').Router()
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
let User = require('../models/user.model')

router.get('/', auth, (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json({ 'Error': err }))
})

router.post('/add', async (req, res) => {
    // Check if username exists
    const usernameExist = await User.findOne({ username: req.body.username})

    if (usernameExist) {
        console.log("[User Creation] Username already exists")
        res.status(400).json({ 'Error': "Username already exists" })
        return
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({
        username: req.body.username,
        hash: hashedPassword,
    })

    try {
        const saveUser = await newUser.save()
        res.status(200).json("User Created!")
    } catch (err) {
        console.log("[User Creation] Error adding new user: " + err)
        res.status(400).json({ 'Error': err })
    }
})

router.post('/login', async (req, res) => {
    try {
        // Check if username exists
        const user = await User.findOne({ username: req.body.username})

        if (!user) {
            console.log("[User Login] Username does not exist")
            res.status(400).json({ 'Error': err })
            return
        }

        const validPassword = await bcrypt.compare(req.body.password, user.hash)
        if (!validPassword) {
            console.log("[User Login] Invalid Password")
            res.status(400).json({ 'Error': "Invalid Password" })
            return
        } else {
            const token = jwt.sign(
                { _id: user._id }, 
                process.env.JWT_TOKEN_SECRET,
                { expiresIn: '20s' })
            res.status(200).json({ 'msg': "Login success!", 'token': token })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ 'Error': 'Server error' })
    }
})

module.exports = router