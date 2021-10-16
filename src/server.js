const server = require("express")();

const app = require("./app");

server.use(app);

server.listen(3333);