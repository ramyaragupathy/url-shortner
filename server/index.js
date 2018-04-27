// Define variables and its values
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const myShortId = require('./idGenerator')
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

// to handle POST data

app.use(bodyParser.urlencoded({
  extended: true
}))

// define index route
app.get('/', function (req, res) {
  res.render('index')
})

app.post('/', function (req, res) {
  // extract the url parameter from request body
  let url = req.body.url
  // create a hashed short version
  let id = myShortId.generateId()
  // store the k-v pair in Redis

  // prints the reply from Redis: OK
  // client.set(id, url, redis.print)
  client.set(id, url, function () {
    // display the shortened url
    res.render('output', { id: id, base_url: baseUrl })
  })
})

app.route('/:id').all(function (req, res) {
  // Get ID from url parameters
  let id = req.params.id.trim()
  // look up the URL within Redis
  client.get(id, function (err, reply) {
    // reply is the key value
    if (!err && reply) {
      // redirect user to the original url
      res.status(301)
      res.set('Location', reply)
      res.send()
    } else {
      // confirm no such link in database
      res.status(404)
      res.render('404')
    }
  })
})

// listen
app.listen(port, () => {
  console.log('Listening on port ' + port)
})
