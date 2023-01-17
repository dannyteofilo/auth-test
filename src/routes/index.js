
import authRoutes from './auth'
import usersRoutes from './users'

module.exports = (app) => {
  app.use('/api/v1/auth', authRoutes)
  app.use('/api/v1/users', usersRoutes)
}
