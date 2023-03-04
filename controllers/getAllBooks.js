const Book = require('../models/books')

const StatusCodes = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllBooks = async (req, res) => {
   const { Name, Author, numericFilters, sort, fields } = req.query
   const queryObject = {}

   if(Name) {
    queryObject.Name = {$regex : Name, $options: 'i'}
   }

   if(Author) {
    queryObject.Author = Author
   }

   if(numericFilters) {
    const operationMap = {
        '>': '$gt',
        '>=': '$gte',
        '=': '$eq',
        '<': '$lt',
        '<=': '$lte',
    }
    const regEx = /\b(<|>|>=|=|<=)\b/g
    let filters = numericFilters.replace(
        regEx,
        (match) => `-${operationMap[match]}-`
    )
    const options = ['price', 'Rating']
    filters = filters.split(',').forEach((item) => {
        const [field, operator, value] = item.split('-')
        if(options.includes(field)) {
            queryObject[field] = {[operator]: Number(value)}
        }
    })
   }

   console.log(queryObject)

   let result =  Book.find(queryObject)

   if(sort) {
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
   }
   else {
    result = result.sort('Name')
   }

   if(fields) {
    const fieldsList = fields.split(',').join(' ')
    result = result.select(fieldsList)
   }

   const page = Number(req.query.page) || 1
   const limit = Number(req.query.limit) || 10
   const skip = (page - 1) * limit

   reuslt = result.skip(skip).limit(limit)

   const books = await result
   res.status(StatusCodes.OK).json({books, nbits: books.length})
}



module.exports = getAllBooks