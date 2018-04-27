// Declare variables
const test = require('tape')
const request = require('request')
const redis = require('redis')
const port = 3000
const baseURL = 'http://localhost:' + port
const client = redis.createClient()

// TEST CASES
test('url-shortner Test Cases', function (testcase) {
  // TEST #1
  testcase.test('Test index page load', function (assert) {
    let stringExists
    request.get(baseURL, function (error, response, body) {
      if (!error) {
        stringExists = response.body.includes('url-shortner')
        assert.equal(true, stringExists)
        assert.end()
      }
    })
  })

  // TEST #2
  testcase.test('Test submitting a URL', function (assert) {
    let stringExists
    let longUrl = 'https://stackoverflow.com/questions/32710847/what-is-the-best-way-to-check-for-empty-request-body'
    request.post(baseURL, {form: {url: longUrl}}, function (error, response, body) {
      if (!error) {
        stringExists = response.body.includes('Your shortened URL is')
        assert.equal(true, stringExists)
        assert.end()
      }
    })
  })

  // TEST #3
  testcase.test('Test URL redirection', function (assert) {
    client.set('test', 'https://www.google.com', function () {
      request.get({
        url: 'http://localhost:3000/testurl',
        followRedirect: false
      }, function (error, response, body) {
        if (!error) {
          assert.equal(response.headers.location, 'http://www.google.com')
          assert.equal(response.statusCode, 301)
          assert.end()
        }
      })
    })
  })
})
