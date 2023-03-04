const Book = require('../models/books')

const StatusCodes = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const updateBook = async (req, res) => {
    try {
        const {id:bookID} = req.params
        if(!bookID) {
            return BadRequestError(`Bad request`)
        }
        
        const book = await Book.findOneAndUpdate({_id:bookID}, req.body, {
            new: true,
            runValidators: true,
        })

        if(!book) {
            return NotFoundError(`No book with id : ${bookID}`)
        }

        res.status(StatusCodes.OK).json({book})

    } catch (error) {
        console.log(error);
    }

}

module.exports = updateBook