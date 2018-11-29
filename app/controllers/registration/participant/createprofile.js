

var {Participants, Users} = require('../../../middlewares/schemas/schema');
var {getSingleData} = require('../../../utils/helpers/general_one_helper');

module.exports = {
    createProfile : async (req, res) => {
        
        let partiPhone = req.body.phone;
        let participant = await getSingleData(Participants,{phone:partiPhone});
        let user = await getSingleData(Users, {phone: req.user.phone});
        console.log(user);
       //console.log(olduser.length);
       //console.log(olduser);
    if(participant===null){
        var newParticipant = new Participants({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            cvm: req.body.cvm,
            email: req.body.email,
            phone: req.body.phone,
            createby: user._id,
            college: req.body.college
        });
       await newParticipant.save(async (err)=>{
            if(err) {
              //  console.log(err);
                res.send(err);
            }
            else{
                await user.registered.participants.push(newParticipant._id);
                await user.save();
               // console.log("Saved");
            res.send(newParticipant + "saved");
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
  