const express = require('express')
const cors = require('cors')
const app = express()


app.use(cors())
app.use(express.json())

const blogsRouter = require("./controllers/blogs")
app.use("/api/blogs", blogsRouter)


module.exports = app