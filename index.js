require('dotenv').config({ path: process.env.NODE_ENV === 'production' ? './.env.prod' : './.env.dev' })
const express = require('express')

const handlers = require('./handlers')
const PORT = process.env.PORT
const { middleware } = require('./middleware')

let app = express()
app = middleware(app)

app.post('/', (req, res) => {
  const handler = handlers[req.body.action]
  if (handler) {
    handler(req, res)
  } else {
    // console.error(`${req.body.action} doesn't have defined handler`)
     res.sendStatus(500)
  }
})

const server = app.listen(PORT, '0.0.0.0', (err) => {
  if (err) {
    console.log(err)
  }
  console.info(`==> listening on http://localhost:${PORT}.`)
})

const stop = () => {
  server.close()
}

module.exports = app

module.exports.stop = stop
