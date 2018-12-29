const router = require('express').Router();

router.get('/dashboard', require('./dashboard').dashboard);

router.get('/registrations', require('./registrations').registrations);

module.exports = router;