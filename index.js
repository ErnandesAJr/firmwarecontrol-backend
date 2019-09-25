const app = require('./src/app');
const server = require('http').Server(app.server);

require('dotenv').config();

const context = {
    express: process.env.SERVER_PORT || 3000,
    environment: process.env.NODE_ENV || 'development'
};

app.database.initialize(context.environment, { forceDelete: true });

server.listen(context.express, () => {
    console.log('Backend Firmware Application running at port ' + context.express);
});