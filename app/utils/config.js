/* this is config file for our application */

module.exports = {
    jsonWebTokenKey : 'jsonWebTokenSecreyKey1212##',
    /* this mysql database config 
       you can also opt for env variables  
    */
    mongoDB : {
        user: 'admin',
        password: 'hellofakepass',
        // host : '34.73.92.20',
        host:'ds135003.mlab.com',
        port:35003,
        // host:'localhost',
        // port : 27017,
        database : 'spectrum'
    },   
     nodemailer:{
        service: 'gmail',
        auth: {
            user: 'spectrumtemp@adit.ac.in',
          pass: 'hellofakepass'
        }
    },
    /* do not change this salrounds value */
    bycryptSalt : 13
}
