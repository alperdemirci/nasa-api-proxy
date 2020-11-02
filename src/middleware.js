
notFound = (req, res, next) => {
    res.status(404)
    const error = new Error(`${req.originalUrl} is not in use, try something different`)
    next(error)
}

errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500
    res.status(statusCode)

    res.json({
        message:error.message,
        stack: error.stack
    })
}

module.exports = {
    notFound,
    errorHandler
}
