/* this is config file for our application */

module.exports = {
    jsonWebTokenKey : 'jsonWebTokenSecreyKey1212##',
    /* this mysql database config 
       you can also opt for env variables  
    */
    mongoDB : {
        host : 'localhost',
        database : 'spectrum'
    },
    /* do not change this salrounds value */
    bycryptSalt : 13
}