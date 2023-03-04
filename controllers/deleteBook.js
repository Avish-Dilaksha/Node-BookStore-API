const Book = require('../models/books')

const StatusCodes = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const deleteBook = async (req, res) => {
    try {
        const {id:bookID} = req.params
        if(!bookID) {
            return BadRequestError(`Bad request`)
        }
        
        const book = await Book.findOneAndDelete({_id:bookID})

        if(!book) {
            return NotFoundError(`No book with id : ${bookID}`)
        }

        res.status(StatusCodes.OK).json({task: null, status: 'success'})
    } catch (error) {
        console.log(error);
    }

}

module.exports = deleteBook