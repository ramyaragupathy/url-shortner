'use strict'
// Declare the variables used
const expect = require('chai').expect
const request = require('request')
const server = require('../server/index')
const redis = require('redis')
const client = redis.createClient()
// Server tasks
describe('server', function () {
  // Beforehand, start the server
  before(function (done) {
    console.log('Starting the server')
    done()
  })
  // Afterwards, stop the server and empty the database
  after(function (done) {
    console.log('Stopping the server')
    client.flushdb()
    done()
  })
  // Test the index route
  describe('Test the index route', function () {
    it('should return a page with the title url-shortner', function (done) {
      request.get({ url: 'http://localhost:5000' }, function (error, response, body) {
        expect(body).to.include('url-shortner')
        expect(response.statusCode).to.equal(200)
        expect(response.headers['content-type']).to.equal('text/html; charset=utf-8')
        done()
      })
    })
  })
})
