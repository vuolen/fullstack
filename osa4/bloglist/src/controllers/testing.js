const Blog = require("../models/blog")
const User = require("../models/user")

const router = require("express").Router()

router.post("/reset", async (request, response) => {
    if (process.env.NODE_ENV !== "test") {
        console.error("SEVERE: testing api called without testing environment!")
        response.status(401).end()
        return
    }
    await Blog.deleteMany()
    await User.deleteMany()

    response.status(204).end()
})

module.exports = router