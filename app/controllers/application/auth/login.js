
var {Participants} = require('../../../middlewares/schemas/schema');
var {getSingleData} = require('../../../utils/helpers/general_one_helper');
var {createToken} = require('../../../utils/tokenhelper.js');
var {transporter,config}=require('../../../utils/sendmail');
function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
module.exports = {
    getOTP:  async(req, res) => {
  
        let userPhone = req.body.phone;
        let loginuser = await getSingleData(Participants,{phone:userPhone},'name phone email password');
       //console.log(olduser.length);
      console.log(loginuser);
        if(!loginuser){
          return res.json({status:true,otp:false,username: false,error:false});
        } else{
            try{
            let rString = randomString(4, '0123456789');
            loginuser.password = rString;
            loginuser.save();

    var mailOptions = {
        from: config.auth.user,
        to: loginuser.email,
        subject: "Spectrum App OTP",
       text: 'Your OTP is ' + rString,
        // html: 'H'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
    //       if(loginuser.password===req.body.password){
    //         let token = await createToken({data: {user:{name:loginuser.name, phone: loginuser.phone, role: loginuser.role}}});
    //         // const tokenData = await verifyToken(token);
    //         // console.log(tokenData);
    //        // res.cookie('access-token',token ,{ maxAge: 900000, httpOnly: true });
    //        // res.send("sada");
    //     //   console
    //   //  res.append('Set-Cookie', 'access-token=' + token + ';');
    //         //return res.cookie('accesstoken',token,{ maxAge: 365 * 24 * 60 * 60 * 1000}).json({status:true,login:true ,username:true,password:true,error:false});
    //         return res.json({status:true,login:true ,username:true,password:true,error:false, token: token, name: loginuser.name,role: loginuser.role});
    //       } else{
            return res.json({status:true,otp:true,username: true,error:false});
    //       }
            } catch (e){
                return res.json({status:true,otp:false,username: true,error:true});
            }
        }
      //  res.json(loginuser);
 // console.log(req.body.email);
 // console.log(req.body.password);
     //res.json({ status: true });
    },

    login: async(req,res)=>{
        let userPhone = req.body.phone;
        let loginuser = await getSingleData(Participants,{phone:userPhone},'name phone password');
       //console.log(olduser.length);
      console.log(loginuser);
        if(!loginuser){
          return res.json({status:true,login:false,username: false,password:false,error:false});
        } else{
          if(loginuser.password===req.body.password){
            let token = await createToken({data: {user:{name:loginuser.name, phone: loginuser.phone}}});
            // const tokenData = await verifyToken(token);
            // console.log(tokenData);
           // res.cookie('access-token',token ,{ maxAge: 900000, httpOnly: true });
           // res.send("sada");
        //   console
      //  res.append('Set-Cookie', 'access-token=' + token + ';');
            //return res.cookie('accesstoken',token,{ maxAge: 365 * 24 * 60 * 60 * 1000}).json({status:true,login:true ,username:true,password:true,error:false});
            return res.json({status:true,login:true ,username:true,password:true,error:false, token: token, name: loginuser.name});
          } else{
            return res.json({status:true,login:false,username: true,password:false,error:false});
          }
          
    }
  }
}