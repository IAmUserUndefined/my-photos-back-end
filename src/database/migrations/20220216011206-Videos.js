"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {

		await queryInterface.createTable("videos", { 
       
			id: {
				type: Sequelize.STRING,
				primaryKey: true,
				allowNull: false
			},

			url: {
				type: Sequelize.STRING,
				allowNull: false
			},

			name: {
				type: Sequelize.STRING,
				allowNull: false
			},

			key: {
				type: Sequelize.STRING,
				allowNull: false
			},

			userId:{
				type: Sequelize.STRING,
				allowNull: false,
				references: {model: "users", key:"id"},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
    
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false
			},

			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false
			}

		});
	},

	down: async (queryInterface) => {
  
		await queryInterface.dropTable("videos");

	}
};