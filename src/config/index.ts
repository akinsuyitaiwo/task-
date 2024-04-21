import dotenv from "dotenv";

dotenv.config();

const config = {
	PORT: process.env.PORT,
	DB_HOST: process.env.DB_HOST as string,
	DB_NAME: process.env.DB_NAME as string,
	DB_USERNAME: process.env.DB_USERNAME as string,
	DB_PASSWORD: process.env.DB_PASSWORD as string,
	JWT_SECRET: process.env.JWT_SECRET  as string,
	GMAIL: process.env.GMAIL,
	GENERATED_PASSWORD: process.env.GENERATED_PASSWORD,
	SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
	SENDGRID_EMAIL: process.env.SENDGRID_EMAIL,
};

const incompleteConfig = Object.entries(config)
	.map(([key, value]) => [key, !!value])
	.filter(([, value]) => !value)
	.map(([key]) => [key]);

if (incompleteConfig.length >= 1) {
	throw new Error(`Missing Configuration Key or Value for: ${incompleteConfig.join(",")}`);
}

export default config;