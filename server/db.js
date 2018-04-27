const redis = require('redis')
const myShortId = require('./idGenerator')
let client

const createRedisClient = () => {
  if (process.env.REDISTOGO_URL) {
    const rtg = require('url').parse(process.env.REDISTOGO_URL)
    client = redis.createClient(rtg.port, rtg.hostname)
    client.auth(rtg.auth.split(':')[1])
  } else {
    client = redis.createClient()
  }
}

const setData = (inputs, callback) => {
  let id = myShortId.generateId()
  let url = inputs.req.body.url
  client.set(id, url, callback(id))
}

const getData = (id, callback) => {
  client.get(id, (err, reply) => {
    callback(err, reply)
  })
}

module.exports = {createRedisClient, setData, getData}
