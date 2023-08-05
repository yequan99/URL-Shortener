const router = require('express').Router()
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
let UserModel = require('../models/user.model')
let UserAuthModel = require('../models/userAuth.model')
let UserSessionTokenModel = require('../models/userSessionToken.model')

router.get('/', auth, (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json({ 'Error': err }))
})

router.post('/add', async (req, res) => {
    // Check if username exists
    const user = await UserModel.findOne({ username: req.body.username})

    if (user) {
        console.log("[User Creation] Username already exists")
        res.status(400).json({ 'Error': "Username already exists" })
        return
    } else {
        // Store new user to DB
        const newUser = new UserModel({
            username: req.body.username
        })

        try {
            const saveUser = await newUser.save()
            res.status(200).json({ 'msg': "User Created!"})
        } catch (err) {
            console.log("[User Creation] Error adding new user: " + err)
            res.status(400).json({ 'Error': err })
        }
    }

    const userid = await UserModel.findOne({ username: req.body.username})

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // Store user pwd to DB
    const newUserAuth = new UserAuthModel({
        userID: userid._id,
        hash: hashedPassword,
    })

    try {
        const saveUserAuth = await newUserAuth.save()
    } catch (err) {
        console.log("[User Auth Creation] Error adding new user pwd: " + err)
        res.status(400).json({ 'Error': err })
    }
})

router.post('/login', async (req, res) => {
    try {
        // Check if username exists
        const user = await UserModel.findOne({ username: req.body.username})

        if (!user) {
            console.log("[User Login] Username does not exist")
            res.status(400).json({ 'Error': err })
            return
        }

        // Validate Password
        const userAuth = await UserAuthModel.findOne({ userID: user._id })

        const validPassword = await bcrypt.compare(req.body.password, userAuth.hash)
        if (!validPassword) {
            console.log("[User Login] Invalid Password")
            res.status(400).json({ 'Error': "Invalid Password" })
            return
        } else {
            // Generate JWT Token
            const token = jwt.sign(
                { _id: user._id }, 
                process.env.JWT_TOKEN_SECRET,
                { expiresIn: '20s' })
            
            // Upserting JWT Token to DB
            const userSessionToken = await UserSessionTokenModel.findOneAndUpdate(
                { userID: user._id },
                { $set: { token: token } },
                { upsert: true, new: true }
            )

            res.status(200).json({ 'msg': "Login success!", 'token': token })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ 'Error': 'Server error' })
    }
})

module.exports = router