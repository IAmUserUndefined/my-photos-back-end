/* eslint-disable no-undef */

const Mail = require("./Mail");
const mail = new Mail();

describe("Email Send", () => {

	test("Should send the email", async () => {
		await mail.sendMail("joao@teste.com", "Test", "createUserEmailBody", {
			appUrl: "test",
			email: "test",
			token: "test"
		});
	});
});