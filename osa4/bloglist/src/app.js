const { MONGOURL } = require('./config')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

console.log('connecting to', MONGOURL)
mongoose.connect(MONGOURL)

const app = express()

app.use(cors())
app.use(express.json())

const blogsRouter = require("./controllers/blogs")
const usersRouter = require('./controllers/users')
app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)


module.exports = app