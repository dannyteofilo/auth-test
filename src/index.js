import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import config from '../config'
import './database/index'
import routes from './routes'
import { Logger } from './utils/'

const app = express()

app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
}

routes(app)

const server = app.listen(config.port, async () => {
  try {
    Logger.info(`🚀 Server running on port ${config.port}`)
  } catch (error) {
    Logger.error('🆘 Error connecting to database: %s', error.message)
  }
})

module.exports = { app, server }
