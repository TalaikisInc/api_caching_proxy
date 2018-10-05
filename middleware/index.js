const morgan = require('morgan')
const responseTime = require('response-time')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
const bodyParser = require('body-parser')

const middleware = (app) => {
  app.use(bodyParser.json({ limit: '1mb' }))

  app.use(cors())

  app.use(morgan('combined', {
    skip: (req, res) => { return res.statusCode < 400 }
  }))

  app.use(responseTime())

  app.use(compression())

  app.use(helmet())

  return app
}

module.exports = {
  middleware
}
