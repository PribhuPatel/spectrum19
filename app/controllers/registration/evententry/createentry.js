

var {Events, Entries, Users, Participants} = require('../../../middlewares/schemas/schema');
var {getSingleData} = require('../../../utils/helpers/general_one_helper');

module.exports = {
    createEntry: async (req, res) => {
        try{
        let user = await getSingleData(Users,{phone: req.user.phone});
        let event = await getSingleData(Events,{name: req.body.intrested_event});
        //console.log(req.body.team_members);
        let team_leader = await getSingleData(Participants,{phone: req.body.team_leader});        
        console.log(team_leader);
        //console.log(r);
        //var team_members = JSON.parse(req.body.team_members);
      //  console.log(team_members);
        let participants = [];
        let partifull = [];
        participants.push(team_leader._id);
        partifull.push(team_leader);
        req.body.team_members.forEach(async (element) => {
            let parti = await getSingleData(Participants,{phone: element.key});
            participants.push(parti._id);
            partifull.push(parti);
        });
        console.log(participants);

        let oldentry  = await getSingleData(Entries, {$and:[{event: event._id},{participants : { "$in" : participants}}]});
       //console.log(olduser.length);
       //console.log(olduser);
    if(oldentry === null){

        var newEntry = new Entries({
            created_by: user._id,
            team_leader: team_leader._id,
            event: event._id,
            participants: participants
        });

       await newEntry.save(async (err)=>{
            if(err) {
              //  console.log(err);
                res.send(err);
            }
            else{
                partifull.forEach(element=>{
                    element.events.push(event._id);
                    element["payment"] = element["payment"] + event.price;
                    element.save();
                });

                user["today_payment"] = user["today_payment"] + event.price;               
               user.registered.entries.push(newEntry._id);
                user.save();
            return res.json({status: true, entryadded: true,user: user, entry: newEntry});
            }
        });
    }else{
        return res.json({status: true, entryadded: false});
    }
} catch(e){
    console.log(e);
    return res.json({status:false});
}
//   console.log(req.body.email);
//   console.log(req.body.password);
     // res.json({ status: true });
    }
  };
  