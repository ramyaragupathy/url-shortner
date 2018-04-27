const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const db = require('./db')
const bodyParser = require('body-parser')
const path = require('path')
const baseUrl = process.env.WEB_URL || 'http://localhost:' + port
db.createRedisClient()

app.listen(port, () => {
  console.log('Listening on port ' + port)
})

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
  const inputs = {req: req, res: res, baseUrl: baseUrl}
  db.setData(inputs, (id) => {
    res.render('output', { id: id, base_url: baseUrl })
  })
})

app.route('/:id').all(function (req, res) {
  let id = req.params.id.trim()
  db.getData(id, (err, reply) => {
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
