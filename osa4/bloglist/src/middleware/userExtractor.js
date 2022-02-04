const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userExtractor = async (request, response, next) => {
    request.user = null
    if (request.token) {
        let decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (decodedToken.id) {
            request.user = await User.findById(decodedToken.id)
        }

    }
    next()
}

module.exports = userExtractor