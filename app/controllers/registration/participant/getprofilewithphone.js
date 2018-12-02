

var {Participants, Users, Colleges} = require('../../../middlewares/schemas/schema');
var {getSingleData,getManyDataWithPopulateWithLimit} = require('../../../utils/helpers/general_one_helper');

module.exports = {
    getProfile : async (req, res) => {
        
        let partiPhone = req.body.phone;
        let limit  = req.body.limit;
       limit=parseInt(limit);
        let participant = await getManyDataWithPopulateWithLimit(Participants,{"$where": "function(){ return this.phone.toString().match(/"+partiPhone+"/)!=null;}"},limit,'college','firstname lastname college phone','name city');
       

        return res.json({status: true, participants: participant});
   
    },
  };
  