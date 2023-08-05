const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5050

app.use(cors())
app.use(express.json())

connectDB()

const usersRouter = require('./routes/user.route')
const loginRouter = require('./routes/login.route')

app.use('/users', usersRouter)
app.use('/login', loginRouter)

app.listen(port, () => { console.log(`Server started on port ${port}`) })