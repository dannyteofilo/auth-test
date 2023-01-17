import mongoose from 'mongoose'
import supertest from 'supertest'
import { createRandomEmail, createRandomName } from '../../../src/helpers'

import { app, server } from '../../../src'
const api = supertest(app)

const names = createRandomName()
const dataNewUser = {
  name: names[0],
  firstName: names[1],
  lastName: names[1],
  email: createRandomEmail(),
  password: 'HolaDaniel10.'
}

let userId = null
let token = null

describe('Auth', () => {
  afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
    await server.close()
    process.env.NODE_ENV = 'test'
  })

  test('You must create a new user', (done) => {
    api
      .post('/api/v1/users')
      .send(dataNewUser)
      .expect(201)
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .end((err, res) => {
        if (err) return done(err)
        userId = res.body.data._id
        done()
      })
  })

  test('You must return status 400 because required fields are not sent', (done) => {
    api
      .post('/api/v1/auth')
      .send({})
      .expect(400)
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  test('You must return status 400 because the user was not found', (done) => {
    api
      .post('/api/v1/auth')
      .send({
        email: 'email@email.com',
        password: 'HolaDaniel10.'
      })
      .expect(404)
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  test('You must return status 400 because the password is invalid', (done) => {
    api
      .post('/api/v1/auth')
      .send({
        email: dataNewUser.email,
        password: '123'
      })
      .expect(401)
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  test('You must login', (done) => {
    api
      .post('/api/v1/auth')
      .send({
        email: dataNewUser.email,
        password: dataNewUser.password
      })
      .expect(200)
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .end((err, res) => {
        if (err) return done(err)
        token = res.body.data
        done()
      })
  })

  test('You must return status 401 because the token is invalid', (done) => {
    process.env.NODE_ENV = 'development'
    api
      .get('/api/v1/users')
      .expect(401)
      .set('Accept', 'application/json')
      .set('x-auth-token', '123')
      .expect('Content-Type', /application\/json/)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  test('You must return status 401 because the token is not sent', (done) => {
    process.env.NODE_ENV = 'development'
    api
      .get('/api/v1/users')
      .expect(401)
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  test('You must validate middleware', (done) => {
    process.env.NODE_ENV = 'development'
    api
      .get('/api/v1/users')
      .expect(200)
      .set('Accept', 'application/json')
      .set('x-auth-token', token)
      .expect('Content-Type', /application\/json/)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})
