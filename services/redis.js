const request = require('superagent')
const redis = require('redis')
const REDIS_PORT = process.env.REDIS_PORT
const client = redis.createClient(REDIS_PORT)

const expiries = require('../env')

const set = (client, expiry, k, v) => {
  client.setex(k, expiry, v)
}

const getExpiry = () => {
  try {
    return expiries.expiries[k]
  } catch (error) {
    return expiries.expiries['*']
  }
}

const get = (k, res) => {
  client.get(k, (err, data) => {
    if (err) {
      res.send(500)
    }
    if (data !== null) {
      res.send(data)
    } else {
      request.get(`${process.env.API_URL}/${k}`, (err, result) => {
        if (!err) {
          set(client, getExpiry(k), k, result.text)
          res.end(result.text)
        } else {
          res.send(500)
        }
      })
    }
  })
}

const del = (k) => {
  const client = redis.createClient(REDIS_PORT)
  client.del(k)
}

module.exports = {
  set,
  get,
  del
}
