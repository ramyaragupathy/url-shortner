// Define variables and its values
const express = require('express')
const app = express()
const port = 3000
const shortid = require('shortid')
const bodyParser = require('body-parser')
const base_url = 'http://localhost:5000'

// Set up connection to Redis
if (process.env.REDISTOGO_URL) {
  console.log(process.env.REDISTOGO_URL)
  const rtg = require('url').parse(process.env.REDISTOGO_URL)
  const client = require('redis').createClient(rtg.port, rtg.hostname)
  client.auth(rtg.auth.split(':')[1])
} else {
  console.log('Creating Redis client ')
  const client = require('redis').createClient()
}
// Set up templating

// __dirname => where the currently executing scripts reside
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
// Express-compliant template engines such as Jade and Pug,
// export a function named __express(filePath, options, callback),
// which is called by the res.render() function to render the template code.
app.engine('jade', require('jade').__express)

// Set URL
app.set('base_url', base_url)

// Handle POST data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// Define index route
app.get('/', function (req, res) {
  res.render('index')
})

// Serve static files
app.use(express.static(__dirname + '/static'))

// Listen
app.listen(port)
console.log('Listening on port ' + port)
