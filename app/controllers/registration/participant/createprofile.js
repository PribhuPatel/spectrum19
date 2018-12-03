

var {Participants, Users, Colleges} = require('../../../middlewares/schemas/schema');
var {getSingleData} = require('../../../utils/helpers/general_one_helper');

module.exports = {
    createProfile : async (req, res) => {
        
        let partiPhone = req.body.phone;
        let participant = await getSingleData(Participants,{phone:partiPhone});
        let user = await getSingleData(Users, {phone: req.user.phone});
        let college = await getSingleData(Colleges,{$and:[{name: req.body.college.split(",")[0]},{city: req.body.college.split(",")[1]}]});

       //console.log(olduser.length);
       //console.log(olduser);
    if(participant===null){
        var newParticipant = new Participants({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            cvm: college.cvm,
            email: req.body.email,
            phone: req.body.phone,
            createby: user._id,
            college: college._id
        });
        //let a= 10;
       await newParticipant.save(async (err)=>{
            if(err) {
              //  console.log(err);
                res.send(err);
            }
            else{
                user["today_payment"] = user["today_payment"] + 30;
                console.log(user["today_payment"]);
                await user.registered.participants.push(newParticipant._id);
                await college.registered.participants.push(newParticipant._id);
                await user.save();
                await user.save();
               // console.log("Saved");
            res.json({status: true, addParticipant: true,participant_payment: newParticipant.payment});
            }
        });
    }else{
        res.json({status: true,addParticipant: false, alreadyAdded: true});
    }
//   console.log(req.body.email);
//   console.log(req.body.password);
     // res.json({ status: true });
    },
  };
  