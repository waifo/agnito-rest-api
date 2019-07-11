const Dummy = require('./dummy.model');


/**
 * Get Dummy
 * @returns {Dummy}
 */
function get(req, res) {
  return res.json("Dummy");
}


module.exports = { get };