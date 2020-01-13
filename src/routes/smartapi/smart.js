const auth = require('./../../plugins/auth');
const parseJson = require('parse-json');
const path = require('path');
var cors = require('cors')
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
        path: "/smartapi/sms/{Id}",
        config: {
            auth: false,
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: async (request, res) => {
            try {
                const id = request.params.Id;
                const db = request.server.plugins.sql.client2;
                const db2 = request.server.plugins.sql.client3;
                console.log("First Call" + id);
                const res = await db2.smartevents2.getunits(id);
                const json = res.recordsets[0][0].Data;
                console.log(json)

                try {
                    parseJson(json);
                } catch (error) {
                    throw error;
                }
                return res.recordsets;

            } catch (err) {
                console.log(err);
            }
        }

    });



};//end of class

