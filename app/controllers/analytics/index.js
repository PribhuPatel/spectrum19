const router = require('express').Router();
const {verifyToken} = require('../../middlewares/verifytoken');

router.use('/admin', require('./admin'));

router.use('/auth', require('./auth'));

router.use('/coordinator', verifyToken,require('./coordinator'));


router.use('/events', verifyToken,require('./events'));

router.use('/add', require('./add'));

router.use('/getdata', require('./getdata'));

router.use('/csv', require('./csv'));

router.use('/notification', require('./notification'));

module.exports = router;