"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.addColumn(
			"photos",
			"key",
			Sequelize.STRING
		);
	},

	down: async (queryInterface) => {
		return queryInterface.removeColumn(
			"photos",
			"key"
		);
	}
};
