import mongoose from 'mongoose'
const uniqueValidator = require('mongoose-unique-validator')

const password = process.argv[2]

if (process.env.MONGODB_URL === undefined) {
    throw Error("MONGODB_URL NOT SET")
}

mongoose.connect(process.env.MONGODB_URL)

interface Person {
    name: String,
    number: String
}

const personSchema = new mongoose.Schema({
    name: {type: String, unique: true, minlength: 3, required: true},
    number: {type: String, unique: true, minlength: 8, required: true}
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export const Person = mongoose.model<Person>('Person', personSchema);