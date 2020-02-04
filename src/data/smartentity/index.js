"use strict";

const utils = require("../utils");
//we can put if else
const register = async ({ sql, getConnection }) => {
   // read in all the .sql files for this folder
   const sqlQueries = await utils.loadSqlQueries("smartentity");
   var getUsers = async (id, datas,stepid, stepnamecaption, stepcaption) => {
      const cnx = await getConnection();
      const request = await cnx.request();
      console.log(stepid);
      if (datas == "") {
         request.input("id", sql.VarChar(50), id);
         console.log("This Inside t" + id +sqlQueries.getunits);
         return request.query(sqlQueries.getunits);
      } else {
         request.input("id", sql.VarChar(50), id);
         request.input("data", sql.VarChar(90000), datas);
         request.input("stepid", sql.VarChar(500), stepid);
         request.input("stepnamecaption", sql.VarChar(500), stepnamecaption);
         request.input("stepcaption", sql.VarChar(500), stepcaption);
         return request.query(sqlQueries.getupdate);
      }
   };
   return {
      getUsers
   };
};

module.exports = { register };

/*




const register2 = async ( { sql, getConnection } ) => {
   // read in all the .sql files for this folder
   const sqlQueries = await utils.loadSqlQueries( "smartentity" );
      var  getunits = async id => {
       // get a connection to SQL Server
       const cnx = await getConnection();
       // create a new request

       const request = await cnx.request();
       console.log("Second CAll ="+id);
       request.input( "id", sql.VarChar( 50 ), id );
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
module.exports = { register2};



const register3 = async ( { sql, getConnection } ) => {
   // read in all the .sql files for this folder
   const sqlQueries = await utils.loadSqlQueries( "smartentity" );
      var  getunits = async id => {
       // get a connection to SQL Server
       const cnx = await getConnection();
       // create a new request

       const request = await cnx.request();
       console.log("Second CAll ="+id);
       request.input( "id", sql.VarChar( 50 ), id );
       // configure sql query parameters
      // request.input( "EmpNo", sql.VarChar( 50 ), userId );
      // return the executed query


      // const request2 = cnx.request();
      // request2.input('UserID', sql.VarChar, userId)


       return request.query( sqlQueries.getupdate );
      // return result;

   };


   return {
      getunits
};


};
module.exports = { register2};

*/