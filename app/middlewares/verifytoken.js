/* this middleware helps us in verifying the token */

const tokenHelper = require('../utils/tokenhelper');
//const resHandler = require('../utils/responseHandler');

exports.verifyToken = async (req,res,next) =>{
  //  console.log(req.body);
    //console.log(req.get('auth'));
    try{
       
        if(req.get('auth') == undefined || null){
        //    return resHandler.errorMessage(res,'no token provided',req);
        return res.send("Fired");
        }
        const tokenData = await tokenHelper.verifyToken(req.get('auth'));
     //   console.log(tokenData.data);
        req.user = tokenData.data.user;
        next();
    }catch(error){
        /* when token expires 
           either you can end session or refresh the token and 
           send 
        */
        if(error.name === 'TokenExpiredError'){
            return resHandler.errorMessage(res,'token expired',req);
        }
      //  resHandler.errorMessage(res,'not a valid token',req);
    }
}
