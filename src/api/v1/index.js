const express = require('express')

const router = express.Router();
const marsWeather = require('./mars-weather')

router.get('/',(req, res) => {
    res.json({
        message:"Hello from API v1"
    })
})

router.use('/mars-weather',marsWeather)

module.exports = router
