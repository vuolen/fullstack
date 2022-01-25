const { PORT } = require("./config")
const http = require('http')
const app = require('./app')

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})