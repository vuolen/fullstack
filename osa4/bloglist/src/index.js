require('dotenv').config()
const http = require('http')
const app = require('./app')
const mongoose = require('mongoose')

const mongoUrl = process.env.MONGODB_URL
mongoose.connect(mongoUrl)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})