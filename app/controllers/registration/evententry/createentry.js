

var {Events, Entries, Users, Participants,Colleges} = require('../../../middlewares/schemas/schema');
var {getSingleData} = require('../../../utils/helpers/general_one_helper');

module.exports = {
//     createEntry: async (req, res) => {
//         try{

//         let payment = 0;
//         let user = await getSingleData(Users,{phone: req.user.phone},'_id today_payment registered');
//         let event = await getSingleData(Events,{name: req.body.intrested_event});
//         //console.log(req.body.team_members);
//         let participant = await getSingleData(Participants,{phone: req.body.participant},'_id college events payment');        
//         // console.log(team_leader);
//         //console.log(r);
//         //var team_members = JSON.parse(req.body.team_members);
//       //  console.log(team_members);
//       let college = await getSingleData(Colleges,{_id: team_leader.college},'registered');
//         // let participants = [];
//         // let partifull = [];
//         // let parti = {};
      
//         // participants.push(team_leader._id);
//         // partifull.push(team_leader);
//         // await req.body.team_members.forEach((element) => {
//         //     console.log();
//         //     parti =  getSingleData(Participants,{phone: element.key},'_id events payment');
//         //     console.log(parti);
//         //     participants.push(parti._id);
//         //     partifull.push(parti);
//         // });
//         // let runloop = await runForEach(Participants,req.body.team_members);
       
//         //  participants = participants.concat(runloop.participants);
//         //  partifull = partifull.concat(runloop.partifull);
//         // // participants = runloop.participants;
//         // // partifull = runloop.partifull;
//         // //let pay = 0;
//         // payment = participants.length * event.price;

        
//     //     console.log();
//     //     console.log(participants);
//     //    console.log();
//     //   console.log(partifull);

//     let date = new Date();
//     // console.log(date+5.5);
//     // date = date+5.5;
    
//     // let da1 =date.getFullYear()+ '-'+(date.getMonth()+1)+'-' +(date.getDate()+1); 
    
//     // console.log();
//     date = convertUTCDateToLocalDate(date);
//  //    let da = date.getFullYear()+ '-'+(date.getMonth()+1)+'-' +date.getDate() ;
//     console.log(date);

//         let oldentry  = await getSingleData(Entries, {$and:[{event: event._id},{participants : { "$in" : participants}}]});
//        //console.log(olduser.length);
//        //console.log();
//        console.log(oldentry);
//        //console.log();
//        if(oldentry === null && event.available_entries != 0){

//         var newEntry = new Entries({
//             created_by: user._id,
//             team_leader: team_leader._id,
//             event: event._id,
//             participants: participants,
//             payment: payment,
//             created_date:date
//         });

//        await newEntry.save(async (err)=>{
//             if(err) {
//               //  console.log(err);
//                 res.send(err);
//             }
//             else{

//                 partifull.forEach(element=>{
//                //     payment = payment +  event.price;
//                     element.events.push(event._id);
//                     element["payment"] = element["payment"] + event.price;
//                     element.save();
//                     user["today_payment"] = user["today_payment"] + event.price;     
//                 });
//                 event["available_entries"] = event["available_entries"] - 1;
//                user.registered.entries.push(newEntry._id);
//                college.registered.entries.push(newEntry._id);
//                college.save();
//                event.save();
//                 user.save();
//             return res.json({status: true, entryadded: true, payment : payment});
//             }
//         });
//     }else{
//         return res.json({status: true, entryadded: false});
//     }
// } catch(e){
//     console.log(e);
//     return res.json({status:false});
// }
// //   console.log(req.body.email);
// //   console.log(req.body.password);
//      // res.json({ status: true });
//     }
createEntry: async (req, res) => {
    // try{
        let date = new Date();
    let payment = 0;
    let user = await getSingleData(Users,{phone: req.user.phone},'_id today_payment registered');
    var event = await getSingleData(Events,{_id: req.body.intrested_event});
    //console.log(req.body.team_members);
    let participant = await getSingleData(Participants,{phone: req.body.participant},'_id college events payment');
    // console.log(team_leader);
    //console.log(r);
    //var team_members = JSON.parse(req.body.team_members);
  //  console.log(team_members);
  let college = await getSingleData(Colleges,{_id: participant.college},'registered');
  let oldentry = await getSingleData(Entries,{$and:[{event: event._id},{participants : { "$in" : participant._id}}]});
    // let participants = [];
    // let partifull = [];
    // let parti = {};
    var leader_id = null;
    let participants = [];
    participants.push(participant._id);
    payment = event.price;
    if(oldentry === null && event.available_entries != 0){
        if(req.body.leader_phone){
            leader_id = await getSingleData(Participants,{phone:req.body.leader_phone});
            // let oldentry  = await getSingleData(Entries, {$and:[{event: event._id},{participants : { "$in" : participants}}]});
            let entry = await getSingleData(Entries,{$and:[{team_leader: leader_id},{event: event._id},{participants : { "$nin" : participant._id}}]},'participants payment');
            if(entry){
            participant.events.push(event_id);
            participant["payment"] = participant["payment"] + event.price;
            user["today_payment"] = user["today_payment"] + event.price; 
                    
            entry.participants.push(participant._id);
            entry["payment"] = entry["payment"] + event.price;
            entry.save();
            user.save();
            participant.save();
            }
            else{
                return res.json({status: true, entryadded: false});
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
                return res.json({status: true, entryadded: true, payment : payment});
                }
            });
        }
    } else {
        res.json({status: true, entryadded: false, entryFull:true});
    }
    // if(leader_id !=null)
    // participants.push(team_leader._id);
    // partifull.push(team_leader);
    // await req.body.team_members.forEach((element) => {
    //     console.log();
    //     parti =  getSingleData(Participants,{phone: element.key},'_id events payment');
    //     console.log(parti);
    //     participants.push(parti._id);
    //     partifull.push(parti);
    // });
    // let runloop = await runForEach(Participants,req.body.team_members);
   
    //  participants = participants.concat(runloop.participants);
    //  partifull = partifull.concat(runloop.partifull);
    // // participants = runloop.participants;
    // // partifull = runloop.partifull;
    // //let pay = 0;
    // payment = participants.length * event.price;

    
//     console.log();
//     console.log(participants);
//    console.log();
//   console.log(partifull);

// let date = new Date();
// // console.log(date+5.5);
// // date = date+5.5;

// // let da1 =date.getFullYear()+ '-'+(date.getMonth()+1)+'-' +(date.getDate()+1); 

// // console.log();
// date = convertUTCDateToLocalDate(date);
// //    let da = date.getFullYear()+ '-'+(date.getMonth()+1)+'-' +date.getDate() ;
// console.log(date);

//    //console.log(olduser.length);
//    //console.log();
//    console.log(oldentry);
//    //console.log();
//    if(oldentry === null && event.available_entries != 0){

//     var newEntry = new Entries({
//         created_by: user._id,
//         team_leader: team_leader._id,
//         event: event._id,
//         participants: participants,
//         payment: payment,
//         created_date:date
//     });

//    await newEntry.save(async (err)=>{
//         if(err) {
//           //  console.log(err);
//             res.send(err);
//         }
//         else{

//             partifull.forEach(element=>{
//            //     payment = payment +  event.price;
//                 element.events.push(event._id);
//                 element["payment"] = element["payment"] + event.price;
//                 element.save();
//                 user["today_payment"] = user["today_payment"] + event.price;     
//             });
//             event["available_entries"] = event["available_entries"] - 1;
//            user.registered.entries.push(newEntry._id);
//            college.registered.entries.push(newEntry._id);
//            college.save();
//            event.save();
//             user.save();
//         return res.json({status: true, entryadded: true, payment : payment});
//         }
//     });
// }else{
//     return res.json({status: true, entryadded: false});
// }
// } catch(e){
// console.log(e);
// return res.json({status:false});
// }
//   console.log(req.body.email);
//   console.log(req.body.password);
 // res.json({ status: true });
}
  };
  

  var runForEach = async (Participants,team_members)=>{
    //   let promises = [];
        var participants = [];
        var partifull = [];
    //     team_members.forEach(async (element) => {
    //         // console.log();
    //         parti = await getSingleData(Participants,{phone: element.key},'_id events payment');
    //         promises.push(parti); 
    //         //console.log(parti);
    //         // participants.push(parti._id);
    //         // partifull.push(parti);
    //     });
    //     console.log(promises);
    //     //console.log("data" +partifull);
    //     Promise.all(promises).then((elem)=>{
    //         console.log(elem);
    //     });
    await asyncForEach(team_members,async (element)=>{
        parti = await getSingleData(Participants,{phone: element.key},'_id events payment'); 
          await  participants.push(parti._id);
           await  partifull.push(parti);
    })
    return {participants,partifull};
  }


  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }