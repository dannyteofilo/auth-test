import User from '../database/models/User'
import { comparePassword, generateToken, isValidStringValue, timestampToDate } from '../helpers'
import { ErrorResponse, Logger, SuccessResponse } from '../utils'
import messages from '../utils/Messages'

export const auth = async (req, res, next) => {
  let { email, password } = req.body

  Logger.info(`[Auth - user]: ${email}`)
  if (!isValidStringValue(email) || !isValidStringValue(password)) return ErrorResponse({ req, res, statusCode: 400, message: messages.en.required })
  email = email.trim()

  Logger.info('[Auth - validate]: user')
  const user = await User.findOne({ email, active: true })
  if (!user) return ErrorResponse({ req, res, statusCode: 404, message: messages.en.user.userNotFound })

  Logger.info('[Auth - validate]: password')
  const isValidPassword = await comparePassword({ passwordReceived: password, passwordSaved: user.password })
  if (!isValidPassword) {
    return ErrorResponse({ req, res, statusCode: 401, message: messages.en.user.invalidCredentials })
  }

  const dataForToken = {
    _id: user._id,
    name: user.name,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    avatar: user.avatar,
    role: user.role,
    active: user.active,
    createdAt: timestampToDate({ timestamp: user.createdAt }),
    updatedAt: timestampToDate({ timestamp: user.updatedAt })
  }
  const token = await generateToken({ data: dataForToken })
  Logger.info('[Auth - generate]: token: %s', JSON.stringify(token))

  SuccessResponse({ req, res, data: token })
}
