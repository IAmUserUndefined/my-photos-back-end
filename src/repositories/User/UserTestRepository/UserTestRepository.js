const UserModel = require("../../../database/models/User");

class UserTestRepository {

	async createTestUsers(){

		await UserModel.create({
			id: "aa98bc1b-22f4-4fc6-be64-3d830068bddc",
			email: "joao@teste.com",
			password: "$2a$10$qccZ2L8csoUcHQR1mMFkJulToLLZTe7Xo7DnM19dV4Ly3r1OkBg6S",
			verificationToken: "544f818f5f5cd4cde44c611683fc71",
			verifiedEmail: true,
			verificationTokenExpiryDate: 16333909805121
		}).catch(err => console.log(err));
	
		await UserModel.create({
			id: "ff98bc1b-22f4-4fc6-be64-3d830068bzaa",
			email: "joao1000@teste.com",
			password: "$2a$10$qccZ2L8csoUcHQR1mMFkJulToLLZTe7Xo7DnM19dV4Ly3r1OkBg6S",
			verificationToken: "216d685d384626d9a575629dc38e88",
			verifiedEmail: false
		}).catch(err => console.log(err));

		await UserModel.create({
			id: "fe98bc1b-22f4-4fc6-be64-3d830068bddd",
			email: "joao5000@teste.com",
			name: "João Pedro",
			password: "$2a$10$qccZ2L8csoUcHQR1mMFkJulToLLZTe7Xo7DnM19dV4Ly3r1OkBg6S",
			verificationToken: "544f818f5f5cd4cde44c611683fc71",
			verifiedEmail: true,
			verificationTokenExpiryDate: 0
		}).catch(err => console.log(err));

	}

	async deleteTestUsers(){
		await UserModel.destroy({
			where: {}
		}).catch(err => console.log(err));
	}
}

module.exports = { 
	UserTestRepository
};