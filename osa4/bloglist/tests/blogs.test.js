const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const supertest = require('supertest')
const app = require('../src/app')
const Blog = require('../src/models/blog')
const User = require('../src/models/user')
const { blogs } = require('./test_blogs')

const api = supertest(app)

beforeAll(async () => {
    await User.deleteMany({})
    const user = new User({
        _id: new mongoose.Types.ObjectId("56cb91bdc3464f14678934ca"),
        username: "testuser",
        name: "Test Person",
        passwordHash: "testpasswordhash"
    })
    await user.save()
})

beforeEach(async () => {
    await Blog.deleteMany({})
})

const login = () => {
    return "bearer " + jwt.sign({username: "testuser", id: "56cb91bdc3464f14678934ca"}, process.env.SECRET)
}

describe("/api/blogs", () => {
    test("returns 0 blogs if none added", async () => {
        const response = await api.get("/api/blogs")
        expect(response.body).toHaveLength(0)
    })

    test("returns 1 after adding single blog", async () => {

        await (new Blog(blogs[0])).save()


        const response = await api.get("/api/blogs")
        expect(response.body).toHaveLength(1)
    })

    test("id stored in id property", async () => {
        await Promise.all(blogs.map(blog => new Blog(blog).save()))

        const response = await api.get("/api/blogs")
        response.body.forEach(blog => expect(blog.id).toBeDefined())
    })

    test("post adds one blog", async () => {
        expect((await api.get("/api/blogs")).body).toHaveLength(0)
        await api
            .post("/api/blogs")
            .set("Authorization", await login())
            .send(blogs[0])
        expect((await api.get("/api/blogs")).body).toHaveLength(1)
    })

    test("likes default to 0", async () => {
        const blog = blogs[0]
        delete blog.likes
        await api.post("/api/blogs").set("Authorization", await login()).send(blog).expect(201)
        const response = await api.get("/api/blogs")
        expect(response.body[0].likes).toBe(0)
    })

    test("returns 400 if title and url not specified", async () => {
        const blog = {...blogs[0]}
        delete blog.title
        delete blog.url
        await api
            .post("/api/blogs")
            .set("Authorization", login())
            .send(blog)
            .expect(400)
    })
})


afterAll(() => {
  mongoose.connection.close()
})