
/*
* if this application is being used on a server, call this file
* else call app.js
* */

const app = require('./app')

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening http://localhost:${port}`)
})
