const express = require("express");

const path = require("path");

const cors = require("./middlewares/cors");

const routers = require("./router/index");

const app = express();

app.use(cors);
app.use(express.static(path.resolve(__dirname, "utils","tmp")));
app.use(express.json());
app.use(routers);

module.exports = app;