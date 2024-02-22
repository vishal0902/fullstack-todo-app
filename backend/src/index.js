
const express = require('express')
const bodyParser = require('body-parser')
const MainRouter = require('./routes/MainRouter')
const cors = require('cors')
const app = express()
const port = 3000


// app.use(express.json())
app.use(bodyParser.json())
app.use(cors())


app.use("/api/v1", MainRouter)

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})