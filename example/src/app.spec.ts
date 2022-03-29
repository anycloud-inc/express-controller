import * as request from 'supertest'
import { app } from './app'

describe('GET /users', () => {
  it('responds with json', done => {
    request(app)
      .get('/users')
      .then(res => {
        expect(res.statusCode).toBe(200)
        expect(res.body).toMatchObject({
          message: 'index example',
        })
      })
      .then(done)
      .catch(done)
  })
})

describe('GET /users/:id', () => {
  it('responds with json', done => {
    request(app)
      .get('/users/1')
      .then(res => {
        expect(res.statusCode).toBe(200)
        expect(res.body).toMatchObject({
          params: { id: '1' },
          message: 'show example',
        })
      })
      .then(done)
      .catch(done)
  })
})

describe('POST /users', () => {
  it('responds with json', done => {
    request(app)
      .post('/users')
      .send({ name: 'john' })
      .then(res => {
        expect(res.statusCode).toBe(200)
        expect(res.body).toMatchObject({
          body: { name: 'john' },
          message: 'create example',
        })
      })
      .then(done)
      .catch(done)
  })
})

describe('PATCH /users/:id', () => {
  it('responds with json', done => {
    request(app)
      .patch('/users/1')
      .send({ name: 'bob' })
      .then(res => {
        expect(res.statusCode).toBe(200)
        expect(res.body).toMatchObject({
          params: { id: '1' },
          body: { name: 'bob' },
          message: 'update example',
        })
      })
      .then(done)
      .catch(done)
  })
})

describe('DELETE /users/:id', () => {
  it('responds with json', done => {
    request(app)
      .delete('/users/1')
      .then(res => {
        expect(res.statusCode).toBe(200)
        expect(res.body).toMatchObject({
          params: { id: '1' },
          message: 'delete example',
        })
      })
      .then(done)
      .catch(done)
  })
})
