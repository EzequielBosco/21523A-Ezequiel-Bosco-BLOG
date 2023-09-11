const express = require('express')
const router = require('./routes') 
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const ejs = require('ejs')
const { db } = require('./config/index.config')

const port = process.env.port || 4000

const app = express()

app.use(router)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "http://localhost:4000"
}))
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, console.log(`Server running at port ${port}`))