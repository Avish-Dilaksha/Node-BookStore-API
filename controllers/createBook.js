const Book = require('../models/books')

const StatusCodes = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const createBook = async (req, res) => {
    const book = await Book.create(req.body)
    res.status(StatusCodes.CREATED).json({book})
}

module.exports = createBook