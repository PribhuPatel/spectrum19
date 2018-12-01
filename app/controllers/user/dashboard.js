

var {Users,Departments} = require('../../middlewares/schemas/schema');
var {getSingleDataWithPopulate, getSingleData,getManyData, getManyDataWithPopulate} = require('../../utils/helpers/general_one_helper');
var {verifyToken}  = require('../../middlewares/verifytoken');
module.exports = {
    dashboard: async (req, res,next) => {
       // let name = req.body.name;
        let userphone = req.body.phone;
        console.log(req.user);
       // let id = req.body.id;
        //let user = await getSingleData(Users,{$or:[{phone: userphone},{_id: id}]},req.body.fields);
        let user = await getSingleData(Users,{phone: req.user.phone});
        let today_registered = user.registered.participants.lenghth;
        let today_payment = user.today_payment;
        let events = await getManyDataWithPopulate(Departments,{},'events','name','name');
        console.log(events);
        if(user===null){
        return res.send("No User Found");
    }else{
        return res.json({status:true, name: user.name,today_registered: today_registered,today_payment: today_payment,eventsdata:events});
    }
}
  };
  