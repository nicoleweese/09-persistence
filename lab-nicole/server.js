'use strict';

const http = require('http');
const Router = require('./lib/router.js');
const doggoRouter = require('./route/doggo-route.js');
const PORT = process.env.PORT || 3000;
const router = new Router();

doggoRouter(router);

const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log(`The server is now listening on PORT ${PORT}! You go girl!`);
});