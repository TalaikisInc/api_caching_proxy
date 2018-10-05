const morgan = require('morgan')
const winston = require('winston')
const expressWinston = require('express-winston')
const responseTime = require('response-time')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
const bodyParser = require('body-parser')

const { USE_MORGAN, USE_WINSTON } = require('../env')

const middleware = (app) => {
  app.use(bodyParser.json({ limit: '1mb' }))

  app.use(cors())

  if (USE_MORGAN) {
    app.use(morgan('combined', {
      skip: (req, res) => { return res.statusCode < 400 }
    }))
  }

  if (USE_WINSTON) {
    app.use(expressWinston.logger({
      transports: [
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error'
        }),
        new winston.transports.Console({
          json: true,
          silent: process.env.NODE_ENV === 'testing',
          colorize: true
        })
      ],
      meta: true,
      msg: 'HTTP {{req.method}} {{req.url}} Time: {{res.responseTime}}ms',
      expressFormat: false,
      colorize: false
    }))
  }

  app.use(responseTime())

  app.use(compression())

  app.use(helmet())

  return app
}

module.exports = {
  middleware
}
