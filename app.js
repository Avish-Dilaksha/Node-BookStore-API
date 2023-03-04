require('dotenv').config()


const express = require('express')
const app = express()

const connectDB = require('./db/connect')
const books = require('./routes/books')

const port = process.env.PORT || 3000

app.use(express.json())

app.use('/api/v1/books', books)

// app.get('/', (req,res) => {
//     res.send('Hello world!')
// })

const start = async () => {
    try {
        // connect to DB
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`Server is listening on ${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()