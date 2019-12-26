

const Hapi = require("hapi");
const BasicAuth = require('hapi-auth-basic')
const plugins = require("./plugins");
const routes = require("./routes");
const Bcrypt = require('bcrypt')



const people = { // our "users database"
   123456765: {
      id: 123456765,
      name: 'addajones2019'
   }
};

const validate = async function (decoded, request) {
   // do your checks to see if the person is valid
   if (!people[decoded.id]) {
      return { isValid: false };
   }
   else {
      return { isValid: true };
   }
};


const app = async config => {



   const { host, port } = config;

   // create an instance of hapi
   const server = Hapi.server({ host, port });

   // register routes

   await server.register(require('hapi-auth-jwt2'));

   server.auth.strategy('jwt', 'jwt',
      {
         key: 'ADDAATTENDENCE',          // Never Share your secret key
         validate: validate,            // validate function defined above
         verifyOptions: { algorithms: ['HS256'] } // pick a strong algorithm
      });

   server.auth.default('jwt');
   // store the config for later use
   server.app.config = config;
   await plugins.register(server);
   await routes.register(server);



   return server;
};

module.exports = app;

