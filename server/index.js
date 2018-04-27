const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const myShortId = require('./idGenerator')
const bodyParser = require('body-parser')
const path = require('path')
const redis = require('redis')
const baseUrl = process.env.WEB_URL || 'http://localhost:' + port
let client

if (process.env.REDISTOGO_URL) {
  const rtg = require('url').parse(process.env.REDISTOGO_URL)
  client = redis.createClient(rtg.port, rtg.hostname)
  client.auth(rtg.auth.split(':')[1])
} else {
  client = redis.createClient()
}

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'jade')
app.engine('jade', require('jade').__express)

app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', function (req, res) {
  res.render('index')
})

app.post('/', function (req, res) {
  let url = req.body.url
  let id = myShortId.generateId()
  client.set(id, url, function () {
    res.render('output', { id: id, base_url: baseUrl })
  })
})

app.route('/:id').all(function (req, res) {
  let id = req.params.id.trim()
  client.get(id, function (err, reply) {
    if (!err && reply) {
      res.status(301)
      res.set('Location', reply)
      res.send()
    } else {
      res.status(404)
      res.render('404')
    }
  })
})

app.listen(port, () => {
  console.log('Listening on port ' + port)
})
