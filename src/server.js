const hapi = require('hapi');
const swagger = require('hapi-swagger');
const inert = require('inert');
const vision = require('vision');

const allRoutes = require('./routes');

const server = new hapi.Server();

const port = Number(process.env.PORT) || Number(process.argv[2]) || 8080;
server.connection({
  host: 'localhost',
  port,
});

server.register([
  inert,
  vision,
  swagger,
]);

server.route(allRoutes);

if (!module.parent) {
  server.start()
    .then(() => {
      console.log(`Server running at: ${server.info.uri}`);
    })
    .catch((error) => { throw error; });
}

module.exports = server;
