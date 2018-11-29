const router = require('express').Router();


 router.use('/participant',require('./participant'));

router.use('/event', require('./events'));

// router.use('/evententry', require('./events'));

router.use('/department', require('./department'));

router.use('/college', require('./college'));


module.exports = router;