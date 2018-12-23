const router = require('express').Router();

router.use('/admin', require('./admin'));

router.use('/auth', require('./auth'));

// router.use('/coordinator', require('./coordinator'));

module.exports = router;