const router = require('express').Router();


// router.post('/addcollege',require('./addcollege').addCollege);

router.get('/allparticipants',require('./csvs').getParticipants);

module.exports = router;