const auth = require('./../../plugins/auth');
//require('../../data/smartentity/smartentitydb');
//const errorHandler = require('./../../helpers/error-handler');
"use strict";
module.exports.registersmart = async server => {
    server.route({
        method: "GET",
        path: "/smartapi/smart",
        config: {
            auth: 'jwt',
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: async request => {
            try {
                // get the sql client registered as a plugin
                var id = request.params.id;
                return "Response";
            } catch (err) {
                console.log(err);
            }
        }
    });

    server.route({
        method: "GET",
        path: "/smartapi/status",
        config: {
            auth: 'jwt', cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: async request => {
            try {
                return "Response : 200 OK"
            } catch (err) {
                console.log(err);
            }
        }
    });

    
    server.route({
        method: "GET",
        path: "/smartapi/sms",
        config: { auth: false },
        handler: async request => {
            try {

                const id = request.params.id;
                const db = request.server.plugins.sql.client2;
                const db2 = request.server.plugins.sql.client3;
                //const res = await db2.smartevents.getUsers();
                const res = await db2.smartevents2.getunits();
               // console.log(db2);
                return res.recordsets;
                //return "Response : 200 OK"
            } catch (err) {
                console.log(err);
            }
        }

    });



};//end of class

