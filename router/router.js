const express = require('express');
const dummyRoute = require('../server/v1/dummy/dummy.route');
const authRoute = require("../server/v1/auth/auth.route")
const usersRoute = require("../server/v1/users/users.route");

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET / - Check service */
router.get('/echo', (req, res) =>
  res.send(req.url)
);
/** GET / - Check version */
router.get('/version', (req, res) =>
  res.send("Version 1.0.0")
);

// mount dummy routes at /dummy
router.use('/dummy', dummyRoute);
// router.use("/users",usersRoute);
router.use("/auth",authRoute);

module.exports = router;