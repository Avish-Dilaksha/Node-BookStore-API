const express = require('express')
const router = express.Router()

const {
    getAllBooks,
    getBook,
    createBook,
    deleteBook,
    updateBook
} = require('../controllers')

router.route('/').get(getAllBooks).post(createBook)
router.route('/:id').get(getBook).delete(deleteBook).patch(updateBook)

module.exports = router
