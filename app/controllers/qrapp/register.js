

var {Events, Participants} = require('../../middlewares/schemas/schema');
var {getManyData,getSingleDataWithPopulate} = require('../../utils/helpers/general_one_helper');
const mongoose =  require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
    checkQr: async (req,res)=>{
        let qr  = req.body.qr;
        let participant = null
        try{
        let id= ObjectId(qr);
        let parti = await getSingleDataWithPopulate(Participants,{_id:id},'college','firstname lastname phone college package','name');
        
        let package= false ;
        if(parti==null || parti== undefined){
            participant = null;
        } else {
            // participant = parti;
        if(parti.package !=null){
            package= true;
        }
            participant = {name:parti.firstname + ' '+ parti.lastname, phone:parti.phone, college:parti.college.name,package:package}
        }
        return res.json({status:true,participant:participant});
    } catch(e){
        return res.json({status:true,participant:null});
        }
    }
  };
  