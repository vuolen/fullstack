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
app.use("/api/blogs", blogsRouter)


module.exports = app