

var {Events, Entries, Users, Participants,Colleges} = require('../../../middlewares/schemas/schema');
var {getSingleData} = require('../../../utils/helpers/general_one_helper');

module.exports = {
createPackage: async (req, res) => {
    // try{
        let date = new Date();
    let payment = 0;
    let user = await getSingleData(Users,{phone: req.user.phone},'_id today_payment registered');

    //console.log(req.body.team_members);
    let participant = await getSingleData(Participants,{phone: req.body.participant},'_id college events payment');
    // console.log(team_leader);
    //console.log(r);
    //var team_members = JSON.parse(req.body.team_members);
  //  console.log(team_members);
  
  let participants = [];
  participants.push(participant._id);
  let college = await getSingleData(Colleges,{_id: participant.college},'registered');
  let oldentry = await getSingleData(Entries,{$and:[{event: event._id},{participants : { "$in" : participants}}]});
    // let participants = [];
    // let partifull = [];
    // let parti = {};
    for(i=0;i<events.length<i++){
    var leader_id = null;
    var event = await getSingleData(Events,{_id: req.body.intrested_event});
    payment = event.price;
    if(oldentry === null){
    if(event.available_entries != 0){
        if(req.body.leader_phone){
            leader_id = await getSingleData(Participants,{phone:req.body.leader_phone});
            // let oldentry  = await getSingleData(Entries, {$and:[{event: event._id},{participants : { "$in" : participants}}]});
            let entry = await getSingleData(Entries,{$and:[{team_leader: leader_id},{event: event._id},{participants : { "$nin" : participants}}]},'participants payment');
            if(entry.participants.length < event.max_members){
            participant.events.push(event._id);
            participant["payment"] = participant["payment"] + event.price;
            user["today_payment"] = user["today_payment"] + event.price; 
                    
            entry.participants.push(participant._id);
            entry["payment"] = entry["payment"] + event.price;
            entry.save();
            user.save();
            participant.save();
            return res.json({status: true, entryadded: true, entryFull:false, alreadyAdded: false,payment:payment})
            }
            else{
                return res.json({status: true, entryadded: false, entryFull:false, alreadyAdded: false,max_members:true,message:"Maximum members in team"});
            }
            // leader_id = req.body.leader_id;

        } else {

            var newEntry = new Entries({
                created_by: user._id,
                team_leader: participant._id,
                event: event._id,
                participants: participants,
                payment: payment,
                created_date:date
            });
        
           await newEntry.save(async (err)=>{
                if(err) {
                  //  console.log(err);
                    res.send(err);
                }
                else{
                    participant.events.push(event._id);
                    participant["payment"] = participant["payment"] + event.price;
                    user["today_payment"] = user["today_payment"] + event.price; 
                    event["available_entries"] = event["available_entries"] - 1;
                    user.registered.entries.push(newEntry._id);
                    college.registered.entries.push(newEntry._id);
                   college.save();
                   event.save();
                    user.save();
                    participant.save();
                    console.log(participant);
                return res.json({status: true, entryadded: true, entryFull:false, alreadyAdded: false, payment : payment});
                }
            });
        }
    } else {
        return res.json({status: true, entryadded: false, entryFull:true, alreadyAdded: false,message:"Event Entry Full"});
    }
} else {
    return res.json({status: true, entryadded: false, entryFull:false, alreadyAdded: true,message:"Participant already added in " +event.name + " event"});
}
}
  }
};