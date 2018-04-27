// Define variables and its values
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const shortid = require('shortid')
const bodyParser = require('body-parser')
const redis = require('redis')
const baseUrl = process.env.WEB_URL || 'http://localhost:' + port
let client

// Set up connection to Redis
// REDISTOGO_URL is for Heroku deployment

if (process.env.REDISTOGO_URL) {
  // Production: Redis To Go
  console.log(process.env.REDISTOGO_URL)
  const rtg = require('url').parse(process.env.REDISTOGO_URL)
  console.log('rtg ', rtg)
  // Extract port, hostname, authentication string
  client = redis.createClient(rtg.port, rtg.hostname)
  client.auth(rtg.auth.split(':')[1])
} else {
  /* Localhost client instantiation
   * When node_redis connects to a Redis instance on local machine,
   * it assumes the default port and host information.
   */
  console.log('Creating Redis client ')
  client = redis.createClient()
}
// Set up templating

// __dirname => where the currently executing scripts reside
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

// Express-compliant template engines such as Jade and Pug,
// export a function named __express(filePath, options, callback),
// which is called by the res.render() function to render the template code.
app.engine('jade', require('jade').__express)

// Handle POST data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// Define index route
app.get('/', function (req, res) {
  res.render('index')
})

app.post('/', function (req, res) {
  let url = req.body.url
  console.log('POST url: ', url)

  // Create a hashed short version
  let id = shortid.generate()
  console.log('id: ', id)

  // Store them in Redis

  // prints the reply from Redis: OK
  // client.set(id, url, redis.print)
  client.set(id, url, function () {
    // Display the response
    res.render('output', { id: id, base_url: baseUrl })
  })
})

app.route('/:id').all(function (req, res) {
  // Get ID
  let id = req.params.id.trim()
  // Look up the URL
  client.get(id, function (err, reply) {
    if (!err && reply) {
      // Redirect user to the original url
      // console.log('Reply: ', reply)
      res.status(301)
      res.set('Location', reply)
      console.log('Response: ', res)
      res.send()
    } else {
      // Confirm no such link in database
      res.status(404)
      res.render('404')
    }
  })
})

// Listen
app.listen(port)
console.log('Listening on port ' + port)
