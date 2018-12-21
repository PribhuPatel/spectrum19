

var {Participants, Events} = require('../../middlewares/schemas/schema');
var {getSingleDataWithPopulate,getManyData} = require('../../utils/helpers/general_one_helper');

module.exports = {
   getEvents: async(req,res)=>{
        let events = await getSingleDataWithPopulate(Participants,{phone:req.user.phone},'events','events','name max_members min_members coordinators rounds description');

        // if(events.length===0){
        //     res.json({status: true});
        // }else{
            return res.json({status:true,events:events,name:req.user.name, events_completed: 1});
        // }   
    }
  };
  