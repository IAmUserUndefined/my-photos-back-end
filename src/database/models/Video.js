const { Model, Sequelize } = require("sequelize");

const sequelize = require("../sequelize/index");

class Video extends Model {}

Video.init({
	userId: Sequelize.STRING,
	url: Sequelize.STRING,
	name: Sequelize.STRING,
	key: Sequelize.STRING,
},{sequelize});

module.exports = Video;