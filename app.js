const express = require('express')
const connectDB = require('./config/db.js')
const app = express()
const bookRouter = require('./routes/bookRoute.js')

app.use(express.json())

app.get("/", (req, res) =>  {
    try {
        res.send("200")
    } catch (err) {
        console.error(err)
    }
})

app.use('/books', bookRouter)


const PORT = process.env.PORT || 8000

app.listen((PORT), async () => {
    try {
        await connectDB()
        console.log(`Listening on port http://localhost:${PORT}`)
    } catch (err) {
        console.error(err)
    }

})