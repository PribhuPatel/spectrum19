const express = require('express');
const ejs = require('ejs');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {handle404Error, handleDevErrors} = require('./app/middlewares/errorHandlers');
//const passport  = require('passport');
const {connectMongoDb} = require('./app/middlewares/mongodb');
app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine
var {verifyToken} = require('./app/middlewares/verifytoken');
//require('./app/utils/passport');

// app.use(require('express-session')({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false
// }));
app.use(connectMongoDb);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
  
  // catch 404 and forward to error handler
 // app.use(handle404Error);
  
  // error handler
 // app.use(handleDevErrors);

  //app.use(require('flash')());
//app.use(ejs);
// app.get('/',(req,res)=>{
//     res.render("index");
// });

 app.use((req,res,next)=>{
   req.user = {};
   req.user.phone = 9586556778;
   req.user.name = 'Shreeji';
   next();
})


app.use(express.static('./public'));
app.use('/',require('./app/router/index'));
app.use('/auth',require('./app/controllers/auth'));
//app.use('/registration',verifyToken,require('./app/controllers/registration'));
app.use('/registration',require('./app/controllers/registration'));
app.use('/department',require('./app/controllers/registration/department'));

var port = process.env.PORT || 8080;
/* query all the errors */
// app.use('/getErrorsList', async ( req, res ) =>{
//     const haha =  await require('./app/logger').queryErrors(new Date('2018-2-11'), new Date());
//     res.json(haha)
//   });


app.listen(port,()=>{
    console.log("server started");
});