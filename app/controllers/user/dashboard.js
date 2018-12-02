

var {Users,Departments} = require('../../middlewares/schemas/schema');
var {getSingleDataWithPopulate, getSingleData,getManyData, getManyDataWithPopulate} = require('../../utils/helpers/general_one_helper');
var {verifyToken}  = require('../../middlewares/verifytoken');
module.exports = {
    dashboard: async (req, res,next) => {
       // let name = req.body.name;
     //   let userphone = req.body.phone;
        console.log(req.user);
       // let id = req.body.id;
        //let user = await getSingleData(Users,{$or:[{phone: userphone},{_id: id}]},req.body.fields);
        let user = await getSingleData(Users,{phone: req.user.phone});
        
        if(user===null){
        return res.send("No User Found");
    }else{
        let today_registered = user.registered.participants.length;
        let today_payment = user.today_payment;
        let events = await getManyDataWithPopulate(Departments,{},'events','name linked_department','name');
        return res.json({status:true, today_registered: today_registered,today_payment: today_payment,eventsdata:events});
    }
}
  };
  