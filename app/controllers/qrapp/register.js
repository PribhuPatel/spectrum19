

var {Events, Participants} = require('../../middlewares/schemas/schema');
var {getManyData,getSingleDataWithPopulate} = require('../../utils/helpers/general_one_helper');

module.exports = {
    checkQr: async (req,res)=>{
        let qr  = req.body.qr;
        let participant = await getSingleDataWithPopulate(Participants,{_id:qr},'college','firstname lastname phone college package','name');
        let package= false ;
        if(participant.package !=null){
            package= true;
        }
        return res.json({status:true,participant:{name:participant.firstname + ' '+ participant.lastname, phone:participant.phone, college:participant.college.name,package:package}});
    }
  };
  