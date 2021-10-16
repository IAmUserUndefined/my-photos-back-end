const path = require("path");
const Helper = require("../../utils/helper/Helper");

const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");

module.exports = class Mail {

	constructor() {
        
		this.mail = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 587,
			secure: false,
			auth: { user: Helper.getEmailEnvironmentVariable(), pass: Helper.getEmailPasswordEnvironmentVariable() }
		});

		this.mail.use("compile", hbs({
			viewEngine: {
				defaultLayout: null,
				partialsDir: path.resolve("./src/resources/emailBody/")
			},
			viewPath: path.resolve("./src/utils/emailBody/"),
			extName: ".html"
		}));
	}

	async sendMail(to, subject, template, context) {
		await this.mail.sendMail({
			from: "Minhas Despesas",
			to: to,
			subject: subject,
			template: template,
			context: context
		});
	}
};