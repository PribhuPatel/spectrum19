const router = require('express').Router();


// router.post('/addcollege',require('./addcollege').addCollege);

router.post('/sendnotifications',require('./sendnotification').sendNotification);


module.exports = router;