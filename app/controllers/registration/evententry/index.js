const router = require('express').Router();


router.post('/createentry',require('./createentry').creatEntry);

module.exports = router;