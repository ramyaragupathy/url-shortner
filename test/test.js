// Declare variables
const test = require('tape')
const request = require('request')
const port = 3000
const baseURL = 'http://localhost:' + port

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
})
