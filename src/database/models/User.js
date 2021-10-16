const { Model, Sequelize } = require("sequelize");

const sequelize = require("../sequelize/index");

const Photo = require("./Photo");

class Users extends Model {}

Users.init({
	email: Sequelize.STRING,
	password: Sequelize.STRING,
	verificationToken: Sequelize.STRING,
	verificationTokenExpiryDate: Sequelize.BIGINT,
	verifiedEmail: Sequelize.BOOLEAN
},{sequelize});

Users.hasMany(Photo);

module.exports = Users;