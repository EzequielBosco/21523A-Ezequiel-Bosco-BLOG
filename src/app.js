const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const methodOverride = require('method-override')
const path = require('path')
const { sequelize, connectBD } = require('./db')
require('ejs')

const app = express()

connectBD()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors({
    origin: "http://localhost:4000"
}))
app.use(morgan('dev'))
app.use(methodOverride('_method'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

module.exports = app
