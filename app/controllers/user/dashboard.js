

var {Users,Departments,Participants} = require('../../middlewares/schemas/schema');
var {getSingleDataWithPopulate, getSingleData,getManyData, getManyDataWithPopulate, getCount} = require('../../utils/helpers/general_one_helper');
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
            return res.json({status: true,message:"No User Found"});
    }else{
        let today_registered = await getCount(Participants,{$and:[{createdby: user._id},{created_date:Date.now}]});;
        let today_payment = user.today_payment;
        let events = await getManyDataWithPopulate(Departments,{},'events','name linked_department','name',{available_entries:{ $ne: 0 }});
        return res.json({status:true, today_registered: today_registered,today_payment: today_payment,eventsdata:events});
    }
}
  };
  