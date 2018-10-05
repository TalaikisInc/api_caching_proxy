const ACTIONS = require('../actions')

const handlers = {
  [ACTIONS.API.CACHE]: require('./cache'),
  [ACTIONS.CACHE.DELETE]: require('./delete')
}

module.exports = handlers
