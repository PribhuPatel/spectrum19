/* this is config file for our application */

module.exports = {
    jsonWebTokenKey : 'jsonWebTokenSecreyKey1212##',
    /* this mysql database config 
       you can also opt for env variables  
    */
    mongoDB : {
        user: 'admin',
        password: 'shreeji1',
        host : 'ds135003.mlab.com',
        port : 35003,
        database : 'spectrum'
    },   
     nodemailer:{
        service: 'gmail',
        auth: {
            user: 'ieee@adit.ac.in',
            pass: 'Shreejieee'
        }
    },
    /* do not change this salrounds value */
    bycryptSalt : 13
}