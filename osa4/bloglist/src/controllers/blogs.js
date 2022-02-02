const Blog = require('../models/blog')
const blogsRouter = require('express').Router()

blogsRouter.get('/', async (request, response) => {
    await Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    if (blog.likes === undefined) {
        blog.likes = 0
    }
    if (blog.title === undefined && blog.url === undefined) {
        response.status(400).json({error: "title and url not defined"})
        return
    }

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

blogsRouter.delete("/:id", async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).send()
})

blogsRouter.put("/:id", async (request, response) => {
    const res = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    response.json(res)
})

module.exports = blogsRouter