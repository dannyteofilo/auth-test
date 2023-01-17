import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../../config'

export const encryptPassword = async (password) => {
  return await bcrypt.hash(password, 10)
}

export const comparePassword = async ({ passwordReceived, passwordSaved }) => {
  return await bcrypt.compare(passwordReceived, passwordSaved)
}

export const generateToken = ({ data }) => {
  return jwt.sign(data, config.jwtSecret, { expiresIn: '1d' })
}

export const decodeToken = ({ token }) => {
  return jwt.verify(token, config.jwtSecret)
}

export const isValidStringValue = (value) => {
  return !!(value && value !== undefined && value !== null && typeof value === 'string' && value.trim() !== '')
}

export const isValidEmail = (email) => {
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  return re.test(String(email).toLowerCase())
}

// validate password with at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character
export const isValidPassword = (password) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/
  return re.test(String(password))
}

export const timestampToDate = ({ timestamp, withHours = true }) => {
  const date = new Date(timestamp * 1000)
  const year = date.getFullYear()
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const hours = date.getHours()
  const minutes = '0' + date.getMinutes()
  const seconds = '0' + date.getSeconds()
  if (!withHours) return `${day}-${month}-${year}`
  return `${day}-${month}-${year} ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`
}

export const createRandomName = () => {
  const names = ['John', 'Paul', 'George', 'Ringo', 'Pete']
  const lastNames = ['Lennon', 'McCartney', 'Harrison', 'Starr', 'Best']
  const name = names[Math.floor(Math.random() * names.length)]
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
  return [name, lastName]
}

export const createRandomEmail = () => {
  const email = `${Math.random().toString(36).substring(2, 15)}@${Math.random().toString(36).substring(2, 15)}.com`
  return email
}
