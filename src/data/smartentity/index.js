"use strict";

const utils = require( "../utils" );
//we can put if else
const register = async ( { sql, getConnection } ) => {
   // read in all the .sql files for this folder
   const sqlQueries = await utils.loadSqlQueries( "smartentity" );
   var  getUsers = async () => {
    
       // get a connection to SQL Server
       const cnx = await getConnection();
       // create a new request
       const request = await cnx.request();
       
       // configure sql query parameters
      // request.input( "EmpNo", sql.VarChar( 50 ), userId );
      // return the executed query
      

      // const request2 = cnx.request();
      // request2.input('UserID', sql.VarChar, userId)     
      

       return request.query( sqlQueries.getusers );
      // return result;
     
   };

  
   return {      
      getUsers
};

 
};


const register2 = async ( { sql, getConnection } ) => {
   // read in all the .sql files for this folder
   const sqlQueries = await utils.loadSqlQueries( "smartentity" );
   var  getunits = async () => {
    
       // get a connection to SQL Server
       const cnx = await getConnection();
       // create a new request
       const request = await cnx.request();
       
       // configure sql query parameters
      // request.input( "EmpNo", sql.VarChar( 50 ), userId );
      // return the executed query
      

      // const request2 = cnx.request();
      // request2.input('UserID', sql.VarChar, userId)     
      

       return request.query( sqlQueries.getunits );
      // return result;
     
   };

  
   return {      
      getunits
};

 
};

module.exports = { register,register2 };