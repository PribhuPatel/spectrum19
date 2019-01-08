

var {Events, Entries, Users, Participants,Colleges} = require('../../../middlewares/schemas/schema');
var {getSingleData} = require('../../../utils/helpers/general_one_helper');

module.exports = {
createPackage: async (req, res) => {
    // try{
        let date = new Date();
    let payment = 0;
    let user = await getSingleData(Users,{phone: req.user.phone},'_id today_payment registered');
    var event1  =req.body.tech1;
    var event2 = req.body.tech2;
    var event3 = req.body.tech3;
    //console.log(req.body.team_members);
    let participant = await getSingleData(Participants,{phone: req.body.participant},'_id college events payment');

  let participants = [];
  participants.push(participant._id);
  let college = await getSingleData(Colleges,{_id: participant.college},'registered');
  
  
  var leader_id = null;
  var event1event = await getSingleData(Events,{_id: event1.intrested_event});
  var event2event = await getSingleData(Events,{_id: event2.intrested_event});
  var event3event = await getSingleData(Events,{_id: event3.intrested_event});
  
  
//   let oldentry = await getSingleData(Entries,{$or:[{$and:[{event: event1event._id},{participants : { "$in" : participants}}]}]});

let oldentry = await getSingleData(Entries,{$and:[{$or:[{event: event1event._id},{event: event2event._id},{event: event3event._id}]}, {participants : { "$in" : participants}}]});

//   let oldentry2 = await getSingleData(Entries,{$and:[{event: event2event._id},{participants : { "$in" : participants}}]});
//   let oldentry3 = await getSingleData(Entries,{$and:[{event: event3event._id},{participants : { "$in" : participants}}]});
    // let participants = [];
    // let partifull = [];
    // let parti = {};
  //  for(i=0;i<events.length<i++){
    
    payment1 = event1event.price;
    payment2 = event2event.price;
    payment3 = event3event.price;

    
    user["today_payment"] = user["today_payment"] + event.price; 

    participant.save();

    user.save();

    if(oldentry === null){
    if(event1event.available_entries != 0 && event2event.available_entries != 0 && event3event.available_entries != 0){


    } else {
        return res.json({status: true, entryadded: false, entryFull:true, alreadyAdded: false,message:"Event Entry Full"});
    }
} else {
    return res.json({status: true, entryadded: false, entryFull:false, alreadyAdded: true,message:"Participant already added in " +event.name + " event"});
}
}
  }
};



var createNewEntry = async (event,intrested_event,participant,participants)=>{
        if(event.leader_phone){
            var leader_id = await getSingleData(Participants,{phone: intrested_event.leader_phone});
            // let oldentry  = await getSingleData(Entries, {$and:[{event: event._id},{participants : { "$in" : participants}}]});
            let entry = await getSingleData(Entries,{$and:[{team_leader: leader_id},{event: event._id},{participants : { "$nin" : participants}}]},'participants payment');
            if(entry.participants.length < event.max_members){
            participant.events.push(event._id);
            participant["payment"] = participant["payment"] + event.price;
                    
            entry.participants.push(participant._id);
            entry["payment"] = entry["payment"] + event.price;
            entry.save();
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
    
}