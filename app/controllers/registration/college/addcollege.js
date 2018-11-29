

var {Departments, Colleges} = require('../../../middlewares/schemas/schema');
var {getSingleData} = require('../../../utils/helpers/general_one_helper');

module.exports = {
    addCollege: async (req, res) => {
        
        let name = req.body.name;
        let city = req.body.city;
        let college = await getSingleData(Colleges,{$and:[{name: name},{city: city}]});
       //console.log(olduser.length);
       //console.log(olduser);
    if(college===null){
        var newCollege = new Departments({
            name: name,
            city: city,
            cvm: cvm
        });
       await newCollge.save((err)=>{
            if(err) {
              //  console.log(err);
                res.send(err);
            }
            else{
               // console.log("Saved");
            res.send(newCollge + "saved");
            }
        });
    }else{
        res.send("Collge Already exist");
    }
//   console.log(req.body.email);
//   console.log(req.body.password);
     // res.json({ status: true });
    },
  };
  