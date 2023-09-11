const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
require('ejs')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors({
    origin: "http://localhost:4000"
}))
app.use(morgan('dev'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

module.exports = app
