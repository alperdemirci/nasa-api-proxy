const express = require('express')
const app = express()
const api = require('./api/v1')

app.set('trust proxy', 1);

require('dotenv').config();
const { notFound, errorHandler } = require('./middleware')

app.get('/', (req, res) => {
    res.send({
        message:"Hello From App.js"
    })
})

app.use('/api/v1', api)

app.use(notFound)
app.use(errorHandler)

module.exports = app
