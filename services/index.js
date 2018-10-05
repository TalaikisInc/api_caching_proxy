const { logger } = require('./logger')
const { get, set, del } = require('./redis')

module.exports = {
  get,
  set,
  del,
  logger
}
