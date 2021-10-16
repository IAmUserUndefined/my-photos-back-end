"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {

		await queryInterface.createTable("users", { 
       
			id: {
				type: Sequelize.STRING,
				primaryKey: true,
				allowNull: false
			},

			email: {
				type: Sequelize.STRING,
				allowNull: false
			},

			password: {
				type: Sequelize.STRING,
				allowNull: false
			},

			verificationToken: {
				type: Sequelize.STRING,
				allowNull: true
			},

			verifiedEmail:{
				type: Sequelize.BOOLEAN,
				allowNull: true
			},
     
			verificationTokenExpiryDate: {
				type: Sequelize.BIGINT,
				allowNull: true
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
  
		await queryInterface.dropTable("users");

	}
};