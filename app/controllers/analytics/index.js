const router = require('express').Router();

router.use('/admin', require('./admin'));

router.use('/auth', require('./auth'));

module.exports = router;