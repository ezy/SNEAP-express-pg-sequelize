const router = require('express').Router();

// api router will mount other routers for all our resources
router.use('/demos', require('./demo/demo.routes'));
router.use('/auth', require('./auth/auth.routes'));

module.exports = router;
