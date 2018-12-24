const router = require('express').Router();


// router.post('/addcollege',require('./addcollege').addCollege);

router.get('/colleges',require('./colleges').getColleges);

router.get('/departments',require('./department').getDepartments);

router.get('/adduserpage',require('./adduserpage').getData);


module.exports = router;