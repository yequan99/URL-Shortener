const router = require('express').Router()
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
let UserModel = require('../models/user.model')
let UserAuthModel = require('../models/userAuth.model')
let UserSessionTokenModel = require('../models/userSessionToken.model')

router.get('/', auth, async (req, res) => {
    try {
        const userID = req.header("x-user-id")
        const user = await UserModel.findById(userID)
        res.status(200).json({ username: user.username })
    } catch (err) {
        console.error("[Retrieve User Info Error] Error getting user info: ", err.message)
        res.status(500).json({ 'Error': 'Server error' })
    }
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
            console.log("[User Creation] Error creating new user: " + err)
            res.status(500).json({ 'Error': "Server error" })
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
        res.status(500).json({ 'Error': "Server error" })
    }
})

router.post('/login', async (req, res) => {
    try {
        // Check if username exists
        const user = await UserModel.findOne({ username: req.body.username})

        if (!user) {
            console.log("[User Login] Username does not exist")
            res.status(400).json({ 'Error': "Invalid Username" })
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
                { expiresIn: '300s' })
            
            // Upserting JWT Token to DB
            const userSessionToken = await UserSessionTokenModel.findOneAndUpdate(
                { userID: user._id },
                { $set: { token: token } },
                { upsert: true, new: true }
            )

            res.status(200).json({ 'msg': "Login success!", 'token': token, 'userID': user._id })
        }
    } catch (err) {
        console.error("[Login Error] Unable to login: ", err.message)
        res.status(500).json({ 'Error': 'Server error' })
    }
})

router.post('/logout', async (req, res) => {
    try {
        // Delete user session token
        const userSessionToken = await UserSessionTokenModel.findOneAndUpdate(
            { userID: req.body.userID },
            { $set: { token: null } },
            { upsert: true, new: true }
        )
        res.status(200).json({ 'msg': "Logout success!" })
    } catch (err) {
        console.error("[Logout Error] Unable to logout: ", err.message)
        res.status(500).json({ 'Error': 'Server error' })
    }
})

module.exports = router