const router = require('express').Router();

router.get('/changesingleevent', require('./changeevent').changeSingleEvent);

module.exports = router;