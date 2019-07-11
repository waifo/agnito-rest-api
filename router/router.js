const express = require('express');
const dummyRoute = require('../server/v1/dummy/dummy.route');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET / - Check service */
router.get('/echo', (req, res) =>
  res.send(req.url)
);

// mount dummy routes at /dummy
router.use('/dummy', dummyRoute);

module.exports = router;