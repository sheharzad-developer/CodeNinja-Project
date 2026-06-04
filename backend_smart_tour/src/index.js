const config = require  ('./config/config');
const app = require ('./server/expressApp');

require('./server/routes');

const server = require('http').Server(app);

server.listen(`${config.port}`, () => {
    console.log(`Server now listening at localhost:${config.port}`);

})

// Safety net: keep the server alive if a controller throws inside a
// pg callback (several controllers query tables that may not exist yet).
process.on('uncaughtException', (err) => {
    console.error('Uncaught exception (server kept alive):', err.message);
})
process.on('unhandledRejection', (err) => {
    console.error('Unhandled rejection (server kept alive):', err && err.message);
})
