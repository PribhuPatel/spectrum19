const router = require('express').Router();

router.get('/dashboard', require('./dashboard').dashboard);

router.get('/registrations', require('./registrations').registrations);

router.get('/events', require('./events').events);

router.get('/users', require('./users').users);

module.exports = router;