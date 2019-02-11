var {Participants, Entries, SingleEntries} = require('../../../middlewares/schemas/schema');
var {getSingleData,getManyData, getManyDataWithPopulate,getCount,getDateWiseCount,localDate} = require('../../../utils/helpers/general_one_helper');

module.exports = {
    changeSingleEvent: async (req, res,next) => {
        var participant = await getSingleData(Participants,{phone:req.body.phone},'firstname lastname phone events');
        
        
        if(participant){
            let index = participant.events.findIndex(x => x.toString()==req.body.event1.toString());
            participant.event[index] = req.body.event2;
            participant.save((err)=>{
                if(err){
                    return res.send("not saved");
                } else {
                    
        await (async()=>{
            return new Promise(async(reject,resolve)=>{
                
                await SingleEntries.updateOne({$and:[{participant:participant._id},{event:req.body.event1}]},{$set:{event:req.body.event2}},{upsert:false});
                await Entries.updateOne({$and:[{team_leader:participant._id},{event:req.body.event1}]},{$set:{event:req.body.event2}},{upsert:false});
            })
                })
        }
    });
        return res.send(participant.name);
    } else {
        return res.send("Participant Not Found");
    }
    }
  };