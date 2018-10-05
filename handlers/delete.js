const { del } = require('../services')

const delCache = async (req, res) => {
  const query = req.body.query
  del(query)
  res.send(JSON.stringify({ 'ok': true }))
}

module.exports = delCache
