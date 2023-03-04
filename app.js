require('dotenv').config()


const express = require('express')
const app = express()


const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req,res) => {
    res.send('Hello world!')
})

const start = async () => {
    try {
        // connect to DB (await)
        app.listen(port, () => {
            console.log(`Server is listening on ${port}...`);
        })
    } catch (error) {
        console.log(er);
    }
}

start()