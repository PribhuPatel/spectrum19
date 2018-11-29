const router = require('express').Router();


router.post('/addcollege',require('./addcollege').addCollege);


module.exports = router;