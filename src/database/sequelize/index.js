const Sequelize = require("sequelize");
const configDb = require("../config/config");

const connect = new Sequelize(configDb);

module.exports = connect;