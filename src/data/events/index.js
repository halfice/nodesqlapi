"use strict";

const utils = require( "../utils" );

const register = async ( { sql, getConnection } ) => {
   // read in all the .sql files for this folder
   const sqlQueries = await utils.loadSqlQueries( "events" );
   var  getEvents = async userId => {
       // get a connection to SQL Server
       const cnx = await getConnection();
       // create a new request
       const request = await cnx.request();
       // configure sql query parameters
       request.input( "EmpNo", sql.VarChar( 50 ), userId );
      // return the executed query
      

      // const request2 = cnx.request();
      // request2.input('UserID', sql.VarChar, userId)     
     //return   request2.execute('GetUserInfo2');//, (err, result) => { 
        //  console.log(result);       
      // return  getEvents= result;
      // });

       return request.query( sqlQueries.getEvents );
      // return result;
     
   };
   return {      
     getEvents
};

 
};

module.exports = { register };