import mongoose from 'mongoose'
import config from '../../config'
import { Logger } from '../utils'

const dbConnection = config.dev ? config.dbDev : config.dbProd
;(async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(dbConnection, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    Logger.info('💾 Connected to database')
  } catch (error) {
    Logger.error('Error connecting to MongoDB', error.message)
  }
})()
