import mongoose from 'mongoose'
import supertest from 'supertest'
import { app, server } from '../../../src'
import { createRandomEmail, createRandomName } from '../../../src/helpers'

const api = supertest(app)

const names = createRandomName()
let dataNewUser = {
  name: names[0],
  firstName: names[1],
  lastName: names[1],
  email: createRandomEmail(),
  password: 'HolaDaniel10.'
}

const namesRandom = createRandomName()
const dataUpdated = {
  name: namesRandom[0],
  firstName: namesRandom[1],
  lastName: namesRandom[1]
}

describe('Users', () => {
  afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
    await server.close()
  })

  test('Must return status 400 because required fields are not sent', (done) => {
    api
      .post('/api/v1/users')
      .send({})
      .expect(400)
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  test('should return status 400 because a valid email is not being sent', (done) => {
    api
      .post('/api/v1/users')
      .send(Object.assign({}, dataNewUser, { email: 'email' }))
      .expect(400)
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  test('Must return status 400 because the password is invalid', (done) => {
    api
      .post('/api/v1/users')
      .send(Object.assign({}, dataNewUser, { password: '123' }))
      .expect(400)
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
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
        dataNewUser = res.body.data
        done()
      })
  })

  test('Must return status 400 because the user already exists', (done) => {
    const dataUser = {
      name: names[0],
      firstName: names[1],
      lastName: names[1],
      email: dataNewUser.email,
      password: 'HolaDaniel10.'
    }
    api
      .post('/api/v1/users')
      .send(dataUser)
      .expect(400)
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  test('You must get all users', (done) => {
    api
      .get('/api/v1/users')
      .expect(200)
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  test('You must get all users with pagination', (done) => {
    api
      .get('/api/v1/users?page=1&perPage=10')
      .expect(200)
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  test('Must return status 400 because user id is not valid', (done) => {
    api
      .get('/api/v1/users/123')
      .expect(400)
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  test('Must return status 404 because user id does not exist', (done) => {
    api
      .get(`/api/v1/users/${mongoose.Types.ObjectId()}`)
      .expect(404)
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  test('You must get user by id', (done) => {
    api
      .get(`/api/v1/users/${dataNewUser._id}`)
      .expect(200)
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  test('Must return status 400 because the user id is invalid in the update', (done) => {
    api
      .put('/api/v1/users/123')
      .send(dataUpdated)
      .expect(400)
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  test('Must return status 400 because the user was not found in the update', (done) => {
    api
      .put(`/api/v1/users/${mongoose.Types.ObjectId()}`)
      .send(dataUpdated)
      .expect(404)
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  test('You must update user by id', (done) => {
    api
      .put(`/api/v1/users/${dataNewUser._id}`)
      .send(dataUpdated)
      .expect(200)
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  test('Must return status 400 because the user id is invalid in the delete', (done) => {
    api
      .delete('/api/v1/users/123')
      .expect(400)
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  test('Must return status 404 because the user was not found in the delete', (done) => {
    api
      .delete(`/api/v1/users/${mongoose.Types.ObjectId()}`)
      .expect(404)
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  test('You must delete user by id', (done) => {
    api
      .delete(`/api/v1/users/${dataNewUser._id}`)
      .expect(200)
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})
