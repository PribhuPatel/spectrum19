var {Revenue,Users,Departments,Participants, Entries, Events, Colleges} = require('../../../middlewares/schemas/schema');
var {getSingleDataWithPopulate, getSingleData,getManyData, getManyDataWithPopulate,getCount,getDateWiseCount} = require('../../../utils/helpers/general_one_helper');
var {verifyToken}  = require('../../../middlewares/verifytoken');
module.exports = {
    revenue: async (req, res,next) => {
        let today_expense = 0;
       var total_expense=0;
       var total_revenue = 0;
      let daily_revenue = await getManyData(Revenue,{});
      for(let i=0;i<daily_revenue.length;i++){
          total_revenue = daily_revenue[i].revenue + total_revenue;
          total_expense = daily_revenue[i].expense + total_expense;
      } 

      let today_payment = await Users.aggregate([
        // { $match: { events : { "$in" : [events[i]._id]}}  },
        { $group: { _id: null,payment : { $sum : "$today_payment" }} }
    ]).exec()
      // let events = await getManyDataWithPopulate(Events,{},'department','name max_participants available_entries','name');
        return res.json({status: true, daily_revenue:daily_revenue,total_revenue:total_revenue,total_expense:total_expense,today_revenue:today_payment[0].payment,today_expense:today_expense});
}
  };
  
