var {Admins,Departments,Participants, Entries, Events} = require('../../../middlewares/schemas/schema');
var {getSingleDataWithPopulate, getSingleData,getManyData, getManyDataWithPopulate,getCount} = require('../../../utils/helpers/general_one_helper');
var {verifyToken}  = require('../../../middlewares/verifytoken');
module.exports = {
    dashboard: async (req, res,next) => {
      
        // let user_name = req.user.name;
        let user =await getSingleDataWithPopulate(Admins,{phone: req.user.phone},'department','name role department','_id');
        console.log(user);
        let department =await getSingleDataWithPopulate(Departments,{_id:user.department._id},'events faculty_coordinator','name linked_department events faculty_coordinator','status name email phone max_participants available_entries event_status');
        // {
        // let events = await getSingleDataWithPopulate(Events,{department:user.department._id},'name max_participants available_entries status');
        // return res.json({status:true, data:{total_registered:total_registered, total_entries: total_entries,total_events:total_events,total_revenue:total_revenue}
        // events: events 
        // });
        return res.json({status:true,department:department,user:user});
    }
// }
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