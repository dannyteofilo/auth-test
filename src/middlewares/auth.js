import { decodeToken } from '../helpers'
import { ErrorResponse } from '../utils'
import messages from '../utils/Messages'
const auth = (req, res, next) => {
  if (process.env.NODE_ENV === 'test') return next()
  try {
    const token = req.header('x-auth-token')
    if (!token) return ErrorResponse({ req, res, statusCode: 401, message: messages.en.token.notFound })

    const decoded = decodeToken({ token })
    req.user = decoded
    next()
  } catch (error) {
    return ErrorResponse({ req, res, statusCode: 401, message: messages.en.token.invalid })
  }
}

module.exports = auth
