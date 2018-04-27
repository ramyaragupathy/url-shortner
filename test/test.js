// Declare variables
const test = require('tape')
const request = require('request')
const redis = require('redis')
const port = 3000
const baseUrl = 'http://localhost:' + port
const client = redis.createClient()

// TEST CASES
test('url-kamkar Test Cases', function (testcase) {
  // TEST #1
  testcase.test('Test index page load', function (assert) {
    let stringExists
    request.get(baseUrl, function (error, response, body) {
      if (!error) {
        stringExists = response.body.includes('url-kamkar')
        assert.equal(true, stringExists, 'Index page loads fine!')
        assert.end()
      }
    })
  })

  // TEST #2
  testcase.test('Test submitting a URL', function (assert) {
    let stringExists
    let longUrl = 'https://stackoverflow.com/questions/32710847/what-is-the-best-way-to-check-for-empty-request-body'
    request.post(baseUrl, {form: {url: longUrl}}, function (error, response, body) {
      if (!error) {
        stringExists = response.body.includes('Your shortened URL is')
        assert.equal(true, stringExists, 'URL submission works!')
        assert.end()
      }
    })
  })

  // TEST #3, #4
  testcase.test('Test URL redirection', function (assert) {
    client.set('test', 'https://www.google.com', function () {
      request.get({
        // goes to app.route('/:id').all()
        url: baseUrl + '/test',
        // if `followRedirect: true` response would be google's home page iwth statusCode 200
        followRedirect: false
      }, function (error, response, body) {
        if (!error) {
          assert.equal(response.headers.location, 'https://www.google.com', 'Redirection works')
          assert.equal(response.statusCode, 301)
          assert.end()
        }
      })
    })
  })

  // TEST #5, #6
  testcase.test('Check nonexistent URL', function (assert) {
    let stringExists
    request.get({
      // goes to app.route('/:id').all()
      url: baseUrl + '/nonexistenturl',
      followRedirect: false
    }, function (error, response, body) {
      if (!error) {
        stringExists = response.body.includes('Short URL not found')
        assert.equal(response.statusCode, 404, '404 error shows up good!')
        assert.equal(true, stringExists)
        assert.end()
      }
    })
  })
})

test.onFinish(() => process.exit(0))
