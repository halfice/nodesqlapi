"use strict";

const api = require( "./api" );
module.exports.register = async server => {
    await api.register( server );
   server.route( {
       method: "GET",
       path: "/",
       handler: async ( request, h ) => {
           return "Connected";
       }
   } );
};

const smartapi = require( "./smartapi" );
module.exports.registersmart = async server => {
    await smartapi.registersmart( server );
   server.route( {
       method: "GET",
       path: "/g",
       handler: async ( request, h ) => {
           return "Connected";

       }
   } );
};