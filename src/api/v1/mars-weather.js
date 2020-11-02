const express = require('express')
const router = express.Router()
const axios = require('axios')

const rateLimit = require("express-rate-limit");

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
//

const limiter = rateLimit({
    windowMs: 30 * 1000, // 30
    max: 2 // limit each IP to 2 requests per windowMs
});

const BASE_URL = `https://api.nasa.gov/insight_weather/`

let cache
let cachetime

router.get('/', limiter, async (req, res, next) => {
    try {
        // in memory caching
        // ideally store the cache to redis or mongodb
        if (cachetime && (cachetime > Date.now()-(30*1000))){
            return res.json(cache)
        }
        //file downloa
        // socket io implement

        const attr = new URLSearchParams({
            "api_key":process.env.NASA_API_KEY,
            "feedtype":"json",
            "ver":"1.0"
        })
        const { data } = await axios.get(`${BASE_URL}/?${attr}`)

        cache = data
        cachetime = new Date()
        data.cachetime = Date.now()

        res.json(data)
    } catch(e) {
        next(e)
    }


})

module.exports = router
