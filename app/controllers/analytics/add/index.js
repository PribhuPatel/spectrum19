const router = require('express').Router();


// router.post('/login',require('./login').login);

router.post('/adduser', require('./user').addUser);

router.post('/adddepartment', require('./department').addDepartment);

module.exports = router;