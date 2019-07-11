const express = require('express');
// const validate = require('express-validation');
// const paramValidation = require('../../config/param-validation');
const dummyCtrl = require('./dummy.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(dummyCtrl.get)

module.exports = router;