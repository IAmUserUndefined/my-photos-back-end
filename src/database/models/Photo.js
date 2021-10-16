const { Model, Sequelize } = require("sequelize");

const sequelize = require("../sequelize/index");

class Photo extends Model {}

Photo.init({
	userId: Sequelize.STRING,
	url: Sequelize.STRING,
	name: Sequelize.STRING,
	key: Sequelize.STRING,
},{sequelize});

module.exports = Photo;