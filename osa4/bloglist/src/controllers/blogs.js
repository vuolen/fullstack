const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()

blogsRouter.get('/', async (request, response) => {
    await Blog
        .find({})
        .populate("user")
        .then(blogs => {
            response.json(blogs)
        })
})



blogsRouter.post('/', async (request, response) => {
    let decodedToken = request.token ? jwt.verify(request.token, process.env.SECRET) : null
    if (!decodedToken || !decodedToken.id) {
        return response.status(401).json({error: "token missing or invalid"})
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog(request.body)

    if (blog.likes === undefined) {
        blog.likes = 0
    }
    if (blog.title === undefined && blog.url === undefined) {
        response.status(400).json({error: "title and url not defined"})
        return
    }

    blog.user = user._id

    const savedBlog = await blog.save()

    await User.findByIdAndUpdate(user._id, {
        blogs: user.blogs.concat(savedBlog._id)
    })

    response.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", async (request, response) => {

    let decodedToken = request.token ? jwt.verify(request.token, process.env.SECRET) : null
    if (!decodedToken || !decodedToken.id) {
        return response.status(401).json({error: "token missing or invalid"})
    }

    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)

    if (user._id.toString() !== blog.user.toString()) {
        return response.status(401).json({error: "not authorized"})
    }

    blog.delete()

    response.status(204).send()
})

blogsRouter.put("/:id", async (request, response) => {
    const res = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    response.json(res)
})

module.exports = blogsRouter