const Helper = require("../../utils/helper/Helper");

module.exports = {
	username: Helper.getDatabaseUsernameEnvironmentVariable(),
	password: Helper.getDatabasePasswordEnvironmentVariable(),
	database: Helper.getDatabaseNameEnvironmentVariable(),
	host: Helper.getHostEnvironmentVariable(),
	port: Helper.getDatabasePortEnvironmentVariable(),
	dialect: Helper.getDatabaseDialectEnvironmentVariable(),
	storage: "./src/database/testDatabase/database.sqlite",
	logging: false,
	define: {
		timestamps: true
	}
};