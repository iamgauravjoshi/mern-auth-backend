import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.APP_PASSWORD
	}
});

export const sendVerificationEmail = async (email, verificationToken) => {
	try {
		const response = await transporter.sendMail({
			from: {
				name: process.env.EMAIL_USER_NAME,
				address: process.env.EMAIL_USER
			},
			to: email,
			subject: 'Verify Your Email',
			html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
			category: "Email Verification",
		});
		console.log("Email sent successfully", response);
	} catch (error) {
		console.error(`Error sending verification`, error);
		throw new Error(`Error sending verification email: ${error}`)
	}
};

export const sendWelcomeEmail = async (email, name) => {
	try {
		const response = await transporter.sendMail({
			from: {
				name: process.env.EMAIL_USER_NAME,
				address: process.env.EMAIL_USER
			},
			to: email,
			subject: `Welcome Aboard!! ${name}`,
			html: WELCOME_USER_TEMPLATE.replace("{user_name}", name),
			category: "Welcome Email",
		});
		console.log("Welcome email sent successfully", response);
	} catch (error) {
		console.error(`Error sending welcome email`, error);
		throw new Error(`Error sending welcome email: ${error}`);
	}
};

export const sendPasswordResetEmail = async (email, resetURL) => {
	try {
		const response = await transporter.sendMail({
			from: {
				name: process.env.EMAIL_USER_NAME,
				address: process.env.EMAIL_USER
			},
			to: email,
			subject: "Reset your password",
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
			category: "Password Reset",
		});
		console.log("Reset Password email sent successfully", response);
	} catch (error) {
		console.error(`Error sending password reset email`, error);
		throw new Error(`Error sending password reset email: ${error}`);
	}
};

export const sendResetSuccessEmail = async (email) => {
	try {
		const response = await transporter.sendMail({
			from: {
				name: process.env.EMAIL_USER_NAME,
				address: process.env.EMAIL_USER
			},
			to: email,
			subject: "Password Reset Successful",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
			category: "Password Reset",
		});
		console.log("Password reset email sent successfully", response);
	} catch (error) {
		console.error(`Error sending password reset success email`, error);
		throw new Error(`Error sending password reset success email: ${error}`);
	}
};