var {Admins,Departments,Participants, Entries, Events} = require('../../../middlewares/schemas/schema');
var {verifyToken}  = require('../../../middlewares/verifytoken');
module.exports = {
    getPortalStatus: async (req, res,next) => {
      
        return res.json({status:true,portal_status:process.env.PORTAL_STATUS});
    },
    portalStatusOn: async (req, res,next) => {
        process.env.PORTAL_STATUS = true;
        return res.json({status:true,portal_status:process.env.PORTAL_STATUS});
    },
    portalStatusChange: async (req, res,next) => {
        console.log(process.env.PORTAL_STATUS);
        if(process.env.PORTAL_STATUS){
        process.env.PORTAL_STATUS=false;
        } else{
        // if(process.env.PORTAL_STATUS===false){
            process.env.PORTAL_STATUS=true;
            }
        return res.json({status:true,portal_status:process.env.PORTAL_STATUS});
    }

// }
  };
