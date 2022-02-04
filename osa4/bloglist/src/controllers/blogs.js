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
    if (!request.user) {
        return response.status(401).json({error: "not authorized"})
    }

    const blog = new Blog(request.body)

    if (blog.likes === undefined) {
        blog.likes = 0
    }
    if (blog.title === undefined && blog.url === undefined) {
        response.status(400).json({error: "title and url not defined"})
        return
    }

    blog.user = request.user._id

    const savedBlog = await blog.save()

    await User.findByIdAndUpdate(request.user._id, {
        blogs: request.user.blogs.concat(savedBlog._id)
    })

    response.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", async (request, response) => {

    if (!request.user) {
        return response.status(401).json({error: "not authorized"})
    }

    const blog = await Blog.findById(request.params.id)

    if (request.user._id.toString() !== blog.user.toString()) {
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