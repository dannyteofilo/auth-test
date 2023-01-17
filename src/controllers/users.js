import mongoose from 'mongoose'
import User from '../database/models/User'
import { encryptPassword, isValidEmail, isValidPassword } from '../helpers'
import { ErrorResponse, Logger, SuccessResponse } from '../utils'
import messages from '../utils/Messages'

// TODO: Add rolesAllowed to config file
const rolesAllowed = ['admin', 'user']

export const getUsers = async (req, res) => {
  const { admin } = req.query
  const query = admin ? { role: 'admin', active: true } : { active: true }
  try {
    const users = await User.find(query)
    SuccessResponse({ res, data: users })
  } catch (error) {
    Logger.error(error.message)
    ErrorResponse({ res, message: messages.en.query.error })
  }
}

export const getUserById = async (req, res) => {
  const { userId } = req.params
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return ErrorResponse({
      res,
      message: messages.en.user.invalidId,
      statusCode: 400
    })
  }
  try {
    const user = await User.find({ _id: userId, active: true })
    if (!user || !user.length) {
      return SuccessResponse({
        res,
        message: messages.en.user.userNotFound,
        statusCode: 404,
        data: {}
      })
    }
    SuccessResponse({ res, data: user })
  } catch (error) {
    Logger.error(error.message)
    ErrorResponse({ res, message: messages.en.query.error })
  }
}

export const createUser = async (req, res) => {
  const { name, firstName, lastName, email, password, role, avatar } = req.body
  if (!email || !password) {
    return ErrorResponse({
      res,
      message: messages.en.required,
      statusCode: 400
    })
  }

  if (!isValidEmail(email)) return ErrorResponse({ res, message: messages.en.invalidEmail, statusCode: 400 })
  if (!isValidPassword(password)) return ErrorResponse({ res, message: messages.en.invalidPassword, statusCode: 400 })
  if (role && !rolesAllowed.includes(role)) return ErrorResponse({ res, message: messages.en.user.invalidRole, statusCode: 400 })
  const passwordHash = await encryptPassword(password)
  const userExists = await User.findOne({ email })
  if (userExists) {
    return ErrorResponse({
      res,
      message: messages.en.user.userExists,
      statusCode: 400
    })
  }
  try {
    const user = await User.create({
      name,
      firstName,
      lastName,
      email,
      avatar,
      password: passwordHash,
      role
    })
    SuccessResponse({ res, data: user, statusCode: 201 })
  } catch (error) {
    Logger.error(error.message)
    ErrorResponse({ res, message: messages.en.query.error })
  }
}

export const updateUser = async (req, res) => {
  const { userId } = req.params
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return ErrorResponse({
      res,
      message: messages.en.user.invalidId,
      statusCode: 400
    })
  }
  const { name, firstName, lastName, email, password, role, active, avatar } = req.body
  const userExists = await User.find({ _id: userId, active: true })
  if (!userExists || !userExists.length) return ErrorResponse({ res, message: messages.en.user.userNotFound, statusCode: 404 })
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        name,
        firstName,
        lastName,
        email,
        password,
        avatar,
        role,
        active,
        updateAt: ~~(new Date().getTime() / 1e3)
      },
      { new: true }
    )
    if (!user) {
      return SuccessResponse({
        res,
        message: messages.en.user.userNotFound,
        statusCode: 404,
        data: {}
      })
    }
    SuccessResponse({ res, data: user })
  } catch (error) {
    Logger.error(error.message)
    ErrorResponse({ res, message: messages.en.query.error })
  }
}

export const deleteUser = async (req, res) => {
  const { userId } = req.params
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return ErrorResponse({
      res,
      message: messages.en.user.invalidId,
      statusCode: 400
    })
  }
  try {
    const user = await User.findByIdAndUpdate(userId, { active: false, updateAt: ~~(new Date().getTime() / 1e3) }, { new: true })
    if (!user) {
      return SuccessResponse({
        res,
        message: messages.en.user.userNotFound,
        statusCode: 404,
        data: {}
      })
    }
    SuccessResponse({ res, data: user })
  } catch (error) {
    Logger.error(error.message)
    ErrorResponse({ res, message: messages.en.query.error })
  }
}
