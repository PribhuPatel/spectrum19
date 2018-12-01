/* this middleware helps us in verifying the token */

const tokenHelper = require('../utils/tokenhelper');
//const resHandler = require('../utils/responseHandler');

exports.verifyToken = async (req,res,next) =>{
    // console.log(req.get('Cookie'));
    //console.log(req.cookies.accesstoken);
   // console.log(req.get('authtoken'));
    console.log(req.body.auth);
    try{
        // if(req.cookies.accesstoken == undefined || null){
        //     return res.redirect('/');
        // }
        if(req.body.auth == undefined || null){
            return res.redirect('/');
        }
        // const tokenData = await tokenHelper.verifyToken(req.cookies.accesstoken);
        
        const tokenData = await tokenHelper.verifyToken(req.body.auth);
        console.log(tokenData);
       req.user= tokenData.data.user;
       // return tokenData;
        next();
    }catch(error){
        /* when token expires 
           either you can end session or refresh the token and 
           send 
        */
        if(error.name === 'TokenExpiredError'){
            return res.redirect('/');
        }
     //   resHandler.errorMessage(res,'not a valid token',req);
    }
}
// exports.checkIfAuthenticated = (req,res,next)=>{
//     if(!req.cookies.accesstoken){
//         //res.redirect('/login');
//         next();
//     }else{
//         res.redirect('/user');
//     }
// }