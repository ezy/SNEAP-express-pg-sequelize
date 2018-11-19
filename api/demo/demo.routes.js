const router = require('express').Router();
const jwt = require('express-jwt');
const controller = require('./demo.controller');
const config = require('../../config/environment');

const secret = config.jwtSecret;

router.route('/')
  .post(jwt({ secret }), controller.createDemo);

router.route('/')
  .get(controller.getAllDemos);

router.route('/:id')
  .get(controller.getDemo);

router.route('/:id')
  .patch(jwt({ secret }), controller.updateDemo);

router.route('/:id')
  .delete(jwt({ secret }), controller.deleteDemo);

module.exports = router;
