// Declare variables
const test = require('tape')
const request = require('request')
const port = 3000
const baseURL = 'http://localhost:' + port

// TEST CASES
test('url-shortner Test Cases', function (testcase) {
  // TEST #1
  testcase.test('Index page', function (assert) {
    let stringExists
    request.get(baseURL, function (error, response, body) {
      stringExists = response.body.includes('url-shortner')
      assert.equal(true, stringExists)
      assert.end()
    })
  })
})
