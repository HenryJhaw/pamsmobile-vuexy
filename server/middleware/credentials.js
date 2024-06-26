const allowedOrigins = require('../config/allowed_origins')

const credentials = (req, res, next) => {
  const origin = req.headers.origin

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }

  next()
}

module.exports = credentials
