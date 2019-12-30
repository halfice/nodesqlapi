//Steps to Add New Route to Connect SQL
//1.First in the Server.js Add the 
//2. Add Plugin 
//await plugins.register(server); Server.js
//  a. plugin is saying add folder data
//  b. in data add the client to server to expose



//3 Add Route
//await routes.registersmart(server); Server.js


"use strict";
const config = require( "./config" );
const server = require( "./server" );
const startServer = async () => {
   try {
       const app = await server( config );
       await app.start();
       console.log( `Server running at http://${ config.host }:${ config.port }...` );
   } catch ( err ) {
       console.log( "startup error:", err );
   }
};

startServer();