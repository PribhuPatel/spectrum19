

var {Users,Departments} = require('../../middlewares/schemas/schema');
var {getSingleDataWithPopulate, getSingleData,getManyData, getManyDataWithPopulate} = require('../../utils/helpers/general_one_helper');

module.exports = {
    dashboard: async (req, res) => {
        console.log(req);
       // let name = req.body.name;
        let userphone = req.body.phone;
       // let id = req.body.id;
        console.log(req.user);
        //let user = await getSingleData(Users,{$or:[{phone: userphone},{_id: id}]},req.body.fields);
        let user = await getSingleData(Users,{phone: req.user.phone});
        let today_registered = user.registered.participants.lenghth;
        let today_payment = user.today_payment;
      //  let events = await getManyData(Departments,{});
    if(user===null){
        res.send("No User Found");
    }else{
        res.json({status:true, name: user.name,today_registered: today_registered,today_payment: today_payment,eventsdata:{}});
    }
}
  };
  