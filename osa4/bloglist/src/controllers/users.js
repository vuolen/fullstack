const bcrypt = require('bcrypt')
const User = require('../models/user')
const usersRouter = require('express').Router()

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const body = request.body

    if (body.password === undefined || body.password.length < 3) {
        response.status(400).json({error: "invalid password"})
        return;
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })

    const savedUser = await user.save().catch(error => {
        response.status(400).json({error: error.message})
    })

    response.json(savedUser)
})

module.exports = usersRouter