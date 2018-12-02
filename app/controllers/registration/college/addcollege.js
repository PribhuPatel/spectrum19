

var {Departments, Colleges} = require('../../../middlewares/schemas/schema');
var {getSingleData} = require('../../../utils/helpers/general_one_helper');

module.exports = {
    addCollege: async (req, res) => {
        
        let name = req.body.name;
        let city = req.body.city;
        let cvm = req.body.cvm;
        let college = await getSingleData(Colleges,{$and:[{name: name},{city: city}]});
       //console.log(olduser.length);
       //console.log(olduser);
    if(college===null){
        var newCollege = new Colleges({
            name: name,
            city: city,
            cvm: cvm
        });
       await newCollege.save((err)=>{
            if(err) {
              //  console.log(err);
                res.send(err);
            }
            else{
               // console.log("Saved");
            res.json({status: true, collegeAdded: true});
            }
        });
    }else{
        res.json({status:true,collegeAdded:false, alreadyInserted: true});
    }
//   console.log(req.body.email);
//   console.log(req.body.password);
     // res.json({ status: true });
    },
  };
  