

var {Departments, Colleges,Participants} = require('../../../middlewares/schemas/schema');
var {getManyDataWithPopulate} = require('../../../utils/helpers/general_one_helper');

module.exports = {
    getParticipants: async (req, res) => {
        var source = [];
        var participants =await getManyDataWithPopulate(Participants,{},'college','college firstname lastname email phone college payment','name');
        if(participants.length != 0 ){
        for(var i = 0; i < participants.length; i++) {
                                console.log(participants)
                                //console.log(participants[i]);
                                source.push({
                                    "firstname":participants[i].firstname, 
                                    "lastname":participants[i].lastname, 
                                    "email":participants[i].email, 
                                    "phone":participants[i].phone,
                                    "college": participants[i].college.name,
                                    "payment": participants[i].payment
                                })
                            }
                            console.log(source);
                            // res.csv(source,true)
                            return res.json(source)
                            // callback(null, source);
                        } else{
                            source.push({
                                "firstname":"", 
                                "lastname":"", 
                                "email":"", 
                                "phone":"",
                                "college": "",
                                "payment": ""
                            })
                        return res.json(source);
                        }
    },
    getByEvents: async (req,res)=>{
        var source = [];
        var participants = await getManyData(Participants,{events : { "$in" : req.body.event_id}},'firstname lastname email phone college');
        if(participants.length != 0 ){
            for(var i = 0; i < participants.length; i++) {
                                    console.log(participants)
                                    //console.log(participants[i]);
                                    source.push({
                                        "firstname":participants[i].firstname, 
                                        "lastname":participants[i].lastname, 
                                        "email":participants[i].email, 
                                        "phone":participants[i].phone,
                                        "college": participants[i].college.name
                                    })
                                }
                                console.log(source);
                                // res.csv(source,true)
                                return res.json(source)
                                // callback(null, source);
                            } else{
                                source.push({
                                    "firstname":"", 
                                    "lastname":"", 
                                    "email":"", 
                                    "phone":"",
                                    "college": ""
                                })
                            return res.json(source);
                            }
    }
  };
  