const router = require('express').Router();


// router.post('/addcollege',require('./addcollege').addCollege);

router.get('/allparticipants',require('./csvgenerators').getParticipants);

router.post('/byevent',require('./csvgenerators').getByEvent);

module.exports = router;