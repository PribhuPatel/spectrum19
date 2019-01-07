

var {Departments, Colleges,Events} = require('../../../middlewares/schemas/schema');
var {getManyData} = require('../../../utils/helpers/general_one_helper');

module.exports = {
    getColleges: async (req, res) => {
        
        let events =await getManyData(Events,{},'name');
      //  let college = await getManyData(Colleges,{},'name city');
       //console.log(olduser.length);
       //console.log(olduser);

//   console.log(req.body.email);
//   console.log(req.body.password);
      return res.json({ status: true, events: events });
    },
  };
  