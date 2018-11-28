

var {Participants} = require('../../middlewares/schemas/participant');
var {getSingleData} = require('../../utils/helpers/general_one_helper');

module.exports = {
    participant: async (req, res) => {
        
        let partiPhone = req.body.phone;
        let participant = await getSingleData(Participants,{phone:partiPhone});
       //console.log(olduser.length);
       //console.log(olduser);
    if(participant===null){
        var newParticipant = new Participants({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phone: req.body.phone,
            createby: req.user.id,
            college: req.body.college
        });
       await newParticipant.save((err)=>{
            if(err) {
              //  console.log(err);
                res.send(err);
            }
            else{
               // console.log("Saved");
            res.send(user + "saved");
            }
        });
    }else{
        res.send("Participant Already exist");
    }
//   console.log(req.body.email);
//   console.log(req.body.password);
     // res.json({ status: true });
    },
  };
  