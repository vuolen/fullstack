require('dotenv').config()
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { Person } from "./models/person"

const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(" ")
}))
app.use(cors())


app.get('/api/persons', (_req, res, next) => {
    Person.find({}).then(persons => {
        res.json(persons)
    }).catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id).then(person => {
        res.json(person)
    }).catch(error => next(error))

})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id).then(() => {
        res.status(204).end()
    }).catch(error => next(error)) 
})

app.put('/api/persons/:id', (req, res, next) => {
    const name = req.body.name
    const number = req.body.number
    Person.findByIdAndUpdate(req.params.id, {name, number}, { new: true }).then(
        updatedPerson => {
            res.json(updatedPerson)
        }
    ).catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    if (!req.body.name) {
        return res.status(400).json({
            error: "name is missing"
        })
    } else if (!req.body.number) {
        return res.status(400).json({
            error: "number is missing"
        })
    }

    const person = new Person({
        name: req.body.name,
        number: req.body.number
    })
    
    person.save().then(savedPerson => {
        res.json(savedPerson)
    }).catch(error => next(error))
})



app.get('/info', (_req, res) => {
    Person.find({}).then(persons => {
        res.send(`<p>The phonebook has info for ${persons.length} people</p>
<p>${new Date()}</p>`)
    })
    
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error: Error, request: express.Request, response: express.Response, next: express.NextFunction) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({error: "malformatted id"})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    }

    next(error)
}

app.use(errorHandler)
