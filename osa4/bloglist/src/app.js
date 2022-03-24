const { MONGOURL } = require('./config')
const express = require('express')
const cors = require('cors')
const tokenExtractor = require('./middleware/tokenExtractor')
const userExtractor = require('./middleware/userExtractor')
const mongoose = require('mongoose')

console.log('connecting to', MONGOURL)
mongoose.connect(MONGOURL)

const app = express()

app.use(cors())
app.use(express.json())
app.use(tokenExtractor)
app.use(userExtractor)

const blogsRouter = require("./controllers/blogs")
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

if (process.env.NODE_ENV === "test") {
    console.log("LOADING TESTING ENDPOINTS")
    const testingRouter = require("./controllers/testing")
    app.use("/api/testing", testingRouter)
}


module.exports = app