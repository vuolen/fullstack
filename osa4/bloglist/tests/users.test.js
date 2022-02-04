const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
})

describe("/api/users", () => {
    const testUser = {
        username: "testusername",
        name: "Test Person",
        password: "testpassword"
    }

    test("returns 0 users if none added", async () => {
        const response = await api.get("/api/users")
        expect(response.body).toHaveLength(0)
    })

    test("returns user if user created", async () => {
        await api.post("/api/users")
            .send(testUser)
            .expect(200)
        const response = await api.get("/api/users")
        expect(response.body[0].username).toBe(testUser.username)
        expect(response.body[0].name).toBe(testUser.name)
    })

    test("user without password not created", async () => {
        const withoutPassword = (({password, ...o}) => o)(testUser)
        await api.post("/api/users")
            .send(withoutPassword)
            .expect(400)
        const response = await api.get("/api/users")
        expect(response.body).toHaveLength(0)
    })

    test("user with short password not created", async () => {
        const shortPassword = {...testUser, password: "12"}
        await api.post("/api/users")
            .send(shortPassword)
            .expect(400)
        const response = await api.get("/api/users")
        expect(response.body).toHaveLength(0)
    })
    
    test("duplicate user not created", async () => {
        await api.post("/api/users")
            .send(testUser)
            .expect(200)

        const error = await api.post("/api/users")
            .send(testUser)
            .expect(400)

        expect(error.body.error).toContain("Error")
        expect(error.body.error).toContain("username")
        expect(error.body.error).toContain("unique")
            
        const response = await api.get("/api/users")
        expect(response.body).toHaveLength(1)
    })
})


afterAll(() => {
  mongoose.connection.close()
})