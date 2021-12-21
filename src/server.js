const server = require("express")();

const app = require("./app");

server.use(app);

server.listen(process.env.PORT || 3333);