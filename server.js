'use strict'

const path = require('path')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({
    path: path.join(__dirname, '.env')
  })
}

const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const { handler } = require('./src/exceptions')
const cloud = require('./src/routes/cloud')
const { NotFoundException } = require('./src/exceptions/exceptions')
const PORT = process.env.PORT || 3000

const app = express()
require('hbs')
app.use(fileUpload())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

app.set('views', path.join(__dirname, 'resources/views'))
app.set('view engine', 'hbs')

app.use(express.static(path.join(__dirname, 'public')))

// Cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')

  next()
})

// Api endpoints
app.use('/api', cloud)

// Routes single page
app.get('/cloud', function (req, res) {
  res.render('index', { title: 'Cloud' })
})

app.get('/cloud*', function (req, res) {
  res.render('index', { title: 'Cloud' })
})

// Not found endpoint
app.use(function (req, res, next) {
  next(new NotFoundException('Ruta no encontrada.'))
})

// Handler exceptions
app.use(handler)

app.listen(PORT, () => {
  console.log(`Ready in port ${PORT}`)
})
