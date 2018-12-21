var {Users,Departments,Participants, Entries, Events} = require('../../../middlewares/schemas/schema');
var {getSingleDataWithPopulate, getSingleData,getManyData, getManyDataWithPopulate,getCount} = require('../../../utils/helpers/general_one_helper');
var {verifyToken}  = require('../../../middlewares/verifytoken');
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
        let total_registered = await getCount(Participants,{});
        let total_entries = await getCount(Entries,{});
        let total_events = await getCount(Events,{});
        let total_revenue  = await runForEach(Participants);
        let events = await getManyDataWithPopulate(Events,{},'department','name max_participants available_entries','name');
        //let today_payment = user.today_payment;
        //let events = await getManyDataWithPopulate(Departments,{},'events','name linked_department','name',{available_entries:{ $ne: 0 }});
        //return res.json({status:true, today_registered: today_registered,today_payment: today_payment,eventsdata:events});
        return res.json({status:true, data:{total_registered:total_registered, total_entries: total_entries,total_events:total_events,total_revenue:total_revenue},
        events: events 
        });
    }
}
  };
  

  var runForEach = async (Participants)=>{
        let payment = 0;
        let participants = await getManyData(Participants,{});
    await asyncForEach(participants,async (element)=>{
            payment = payment + element.payment;
    })
    return payment;
  }


  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }