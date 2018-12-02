

var {Participants, Users, Colleges} = require('../../../middlewares/schemas/schema');
var {getSingleData,getManyDataWithPopulateWithLimit} = require('../../../utils/helpers/general_one_helper');

module.exports = {
    getProfile : async (req, res) => {
        
        let partiPhone = req.body.phone;
        let participant = await getManyDataWithPopulateWithLimit(Participants,{"$where": "function(){ return this.phone.toString().match(/"+partiPhone+"/)!=null;}"},req.body.limit,'college','firstname lastname college phone','name city');
        //let user = await getSingleData(Users, {phone: req.user.phone});
        // let college = await getSingleData(Colleges,{$and:[{name: req.body.college.split(",")[0]},{city: req.body.college.split(",")[1]}]});
        // console.log(college);
       //console.log(olduser.length);
       //console.log(olduser);
        console.log(participant);
       if(participant===null){
        
    }else{
        res.json({status: true,addParticipant: false, alreadyAdded: true});
    }
//   console.log(req.body.email);
//   console.log(req.body.password);
     // res.json({ status: true });
    },
  };
  