require('dotenv').config()
const express  = require('express')
const cors  = require('cors')
const router = require('./routes/router')
require('./config/connection')
const ebServer = express()

ebServer.use(cors())
ebServer.use(express.json())
ebServer.use(router)
ebServer.use('/uploads',express.static('uploads'))

const PORT = 3000 || process.env.PORT

ebServer.listen(PORT,()=>{
    console.log(`Event Booking Server started at port : ${PORT} and waiting for client request!!!!`);
    
})

// http://localhost:3000/  -get
 ebServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:red">Event Booking Server Started and waiting for client request</h1>`)
 })

 