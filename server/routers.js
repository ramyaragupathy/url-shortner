const express = require('express')
const app = express()
const router = express.Router()
const port = 8000

app.listen(port)

app.use('/hello', router)
app.get('/', function (req, res) {
  res.send('index')
})
router.get('/sample', function (req, res) {
  res.send('this is the sample page')
})
router.get('/', function (req, res) {
  res.send('this is the index page')
})
router.get('/:name', function (req, res) {
  res.send('hello ' + req.params.name + '!')
})
router.get('/ramya', function (req, res) {
  res.send('this is ramya\'s page')
})
