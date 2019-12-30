const auth = require('./../../plugins/auth');
//const errorHandler = require('./../../helpers/error-handler');
"use strict";
module.exports.register = async server => {
    server.route({
        method: "GET",
        path: "/api/events",
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
        path: "/api/events/:id",
        config: { auth: 'jwt' },
        handler: async request => {
            try {
                // get the sql client registered as a plugin
                var id = request.params.id;
                return "Response" + id;
            } catch (err) {
                console.log(err);
            }
        }

    });

    server.route({
        method: "GET",
        path: "/api/status",
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
        path: "/api/userinfo/{id}",
        //config: { auth: 'jwt' },
          config: { auth: false },
        handler: async request => {
            try {
                const id = request.params.id;
                const db = request.server.plugins.sql.client;
                const userId = id;
                const res = await db.events.getEvents(userId);
                return res.recordsets;
            } catch (err) {
                console.log(err);
            }
        }
    });

    server.route({
        method: "GET",
        path: "/api/statusme",
        config: { auth: false },
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
        path: "/api/sms",
        config: { auth: false },
        handler: async request => {
            try {
                //const id = request.params.id;
                const db = request.server.plugins.sql.client;
                console.log(db);
                //const res = await db.events.getusers();
                 
                 //return res.recordsets;
               // return "Response : 200 OK"
            } catch (err) {
                console.log(err);
            }
        }

    });



};//end of class