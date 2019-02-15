

var {Events, Participants, Ondayusers,Eventattendance} = require('../../middlewares/schemas/schema');
var {getManyData,getSingleDataWithPopulate, getManyDataWithPopulate} = require('../../utils/helpers/general_one_helper');
const mongoose =  require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
    checkQr: async (req,res)=>{
        let qr  = req.body.qr;
        let event = [];
        event.push(req.user.event);
        let participant = null;
        var alreadyRegistered=false
        try{
        let id= ObjectId(qr);
        let parti = await getSingleData(Participants,{$and:[{_id:id},{events:{'$in':event}}]},'firstname lastname phone registered');
            
        if(parti==null || parti== undefined){
            participant = null;
        } else {
            let present = await getSingleData(Eventattendance,{event:event});

            if(present.present.includes(parti._id)){
                alreadyRegistered=true;
            } else {
                present.present.push(parti._id);
                present.save();
            } 
            // participant = parti;
       
            participant = {name:parti.firstname + ' '+ parti.lastname, phone:parti.phone}
    }
        return res.json({status:true,participant:participant,error:false,alreadyRegistered:alreadyRegistered});
    } catch(e){
        return res.json({status:true,participant:null,error:true,alreadyRegistered:false});
        }
    },
    ckeckAttendance: async (req,res)=>{
        let event = [];
        event.push(req.user.event);
        let present = await getSingleDataWithPopulate(Eventattendance,{event:req.user.event},'present','present','firstname lastname phone');
        let absent = await getManyData(Participants,{$and:[{events:{'$in':event}},{_id:{$nin: present.present.$.id}}]},'firstname lastname phone')
        return res.json({status:true, presentParticipants:present.present, absentParticipants: absent})
    }
  };
  