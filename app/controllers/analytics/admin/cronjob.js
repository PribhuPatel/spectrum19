var {Users,Departments,Participants, Entries, Events, Colleges} = require('../../../middlewares/schemas/schema');
var {getSingleDataWithPopulate, getSingleData,getManyData, getManyDataWithPopulate,getCount,getDateWiseCount} = require('../../../utils/helpers/general_one_helper');
var {verifyToken}  = require('../../../middlewares/verifytoken');
module.exports = {
    runCron: async (req, res,next) => {
      
        let users = await getManyData(Users,{},'today_payment payment_history');
        let date = new Date();
        // console.log(date+5.5);
        // date = date+5.5;
        console.log(date);
        // let da1 =date.getFullYear()+ '-'+(date.getMonth()+1)+'-' +(date.getDate()+1); 
        
        // console.log();
        date = convertUTCDateToLocalDate(date);
        let da = date.getFullYear()+ '-'+(date.getMonth()+1)+'-' +date.getDate() ;
        
        for(let i=0;i<users.length;i++){
            users[i].payment_history.push({
                date: da+' 00:00:00',
                password
            })
        }
        
        // let events = await getManyDataWithPopulate(Events,{},'department','name max_participants available_entries','name');
        return res.json({status: true, events: events});
}
  };
  
