import { decodeToken, generateToken, timestampToDate } from '../../../src/helpers'

let token = null

describe('Helpers', () => {
  test('Generate token', () => {
    token = generateToken({ data: { userId: 1 } })
    expect(token).toBeTruthy()
  })

  test('Decode token', () => {
    expect(decodeToken({ token })).toBeTruthy()
  })

  test('Timestamp to date with hours', () => {
    expect(timestampToDate({ timestamp: 1673213302 })).toBe('08-01-2023 15:28:22')
  })

  test('Timestamp to date with out hours', () => {
    expect(timestampToDate({ timestamp: 1673213302, withHours: false })).toBe('08-01-2023')
  })
})
