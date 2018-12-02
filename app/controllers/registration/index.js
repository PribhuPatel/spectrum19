const router = require('express').Router();


router.use('/participant',require('./participant'));

router.use('/event', require('./events'));

//router.use('/evententry', require('./evententry'));

router.use('/department', require('./department'));

router.use('/college', require('./college'));

router.use('/user', require('./user'));


module.exports = router;