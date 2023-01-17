require('dotenv').config()

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  dbProd: process.env.URL_MONGO_PROD,
  dbDev: process.env.URL_MONGO_DEV,
  jwtSecret: process.env.JWT_SECRET
}

module.exports = config
