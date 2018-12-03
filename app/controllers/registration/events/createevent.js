

var {Departments, Events} = require('../../../middlewares/schemas/schema');
var {getSingleData} = require('../../../utils/helpers/general_one_helper');

module.exports = {
    createEvent: async (req, res) => {
        
        let name = req.body.name;
        let department = await getSingleData(Departments,{name: req.body.department});
        let max_participants= req.body.max_participants;
        let min_members= req.body.min_members;
        let max_members= req.body.max_members;
        let price = req.body.price;

        let event = await getSingleData(Events,{name: name});
       //console.log(olduser.length);
       //console.log(olduser);
       if(department === null){
           res.send("Cannot Add Event Without Department");
       } else{
    if(event===null){
        var newEvent = new Events({
            name: name,
            department: department._id,
            max_members:max_members,
            min_members: min_members,
            max_participants: max_participants,
            price: price,
            available_entries:max_participants
        });

       await newEvent.save(async (err)=>{
            if(err) {
              //  console.log(err);
                res.send(err);
            }
            else{
                department.events.push(newEvent._id);
                await department.save();
               // console.log("Saved");
            res.send(newEvent + "saved");
            }
        });
    }else{
        res.send("Event Already exist");
    }
}
//   console.log(req.body.email);
//   console.log(req.body.password);
     // res.json({ status: true });
    },
  };
  