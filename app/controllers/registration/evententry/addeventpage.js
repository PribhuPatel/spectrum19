

var {Departments, Colleges,Events, Entries} = require('../../../middlewares/schemas/schema');
var {getManyData} = require('../../../utils/helpers/general_one_helper');

module.exports = {
  addEventPage: async (req, res) => {
        
        let events =await getManyData(Events,{},'name');
      //  let college = await getManyData(Colleges,{},'name city');
       //console.log(olduser.length);
       //console.log(olduser);

//   console.log(req.body.email);
//   console.log(req.body.password);
      return res.json({ status: true, events: events });
    },
    getLeaders: async(req,res)=>{
      let partiPhone = req.body.leader_phone;
     let leaders =  await Entries.find({event:req.body.event_id}).populate({
        path: 'team_leader',
    match: {"$where": "function(){ return this.phone.toString().match(/"+partiPhone+"/)!=null;}"},
    // Explicitly exclude `_id`, see http://bit.ly/2aEfTdB
    select: 'phone name',
    options: { limit: 5 }
  }).
  exec();
  return res.json({status:true, leaders:leaders});
    }
  };
  