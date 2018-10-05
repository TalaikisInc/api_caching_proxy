const { get } = require('../services')

const cache = async (req, res) => {
  const query = req.body.query
  get(query, res)
}

module.exports = cache
