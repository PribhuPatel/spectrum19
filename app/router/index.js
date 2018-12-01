var express = require('express');
var router = express.Router();
var {verifyToken} = require('../middlewares/verifytoken');
/* GET home page. */


router.get('/',(req,res)=>{
  //  console.log(req);
    res.render("index");
});

router.get('/user',verifyToken,(req,res)=>{
    res.render("user",{user:req.user});
});

router.get('/login',function(req, res, next) {
  res.render('login');
});

router.get('/signup', function(req, res, next) {
    res.render('signup');
});

module.exports = router;
