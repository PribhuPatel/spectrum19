const router = require('express').Router();

const {verifyToken} = require('../../middlewares/verifytoken');

router.use('/auth',require('./auth'));

router.post('/register',verifyToken,require('./register').checkQr);

router.post('/event/register',verifyToken,require('./event').checkQr);

router.post('/event/checkAttendance',verifyToken,require('./event').ckeckAttendance);


module.exports = router;