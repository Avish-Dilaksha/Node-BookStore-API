const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, 'Please provide book name'],
        maxlength: 50,
    },
    Author: {
        type: String,
        required: [true, 'Please provide author name'],
        maxlength: 50,
    },
    Description: {
        type: String,
        maxlength: 500
    },
    price: {
        type: Number,
        required: [true, 'Please provide peice'],
    },
    Rating: {
        type: Number,
        default: 4.5,
    }
})

module.exports = mongoose.model('Books', bookSchema)