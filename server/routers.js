const express = require('express')
const app = express()
const router = express.Router()
const port = 8000

router.get('/sample', function (req, res) {
  res.send('this is the index page')
})

app.listen(port)
app.use('/hello', router)
