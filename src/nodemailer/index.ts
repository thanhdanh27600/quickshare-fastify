import * as nodemailer from "nodemailer";
import {
	EMAIL_SERVER_HOST,
	EMAIL_SERVER_PASSWORD,
	EMAIL_SERVER_PORT,
	EMAIL_SERVER_USER,
} from "../utils/config";
import {isProduction} from "../utils/constants";

// Nodemailer configuration
export const transporter = nodemailer.createTransport({
	host: EMAIL_SERVER_HOST,
	port: EMAIL_SERVER_PORT,
	auth: {
		user: EMAIL_SERVER_USER,
		pass: EMAIL_SERVER_PASSWORD,
	},
	...(isProduction
		? {}
		: {
				debug: true, // show debug output
				logger: true, // log information in console
		  }),
});
