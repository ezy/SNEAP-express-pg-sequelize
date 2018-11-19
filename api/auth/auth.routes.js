const router = require('express').Router();
const controller = require('./auth.controller');

router.route('/register')
  .post(controller.createUser);

router.route('/login')
  .post(controller.verifyUser);

module.exports = router;
