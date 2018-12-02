const router = require('express').Router();


router.post('/createentry',require('./createentry').createEntry);

module.exports = router;