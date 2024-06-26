import Joi from "joi";
import { IUser, ILogin } from "../utils/interface";

const options = {
	stripUnknown: true,
	abortEarly: false,
	errors: {
		wrap: {
			label: ""
		}
	}

};

const validateSignUp = (signup: IUser) => {
	const userSignUp = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().min(6).max(36).required()
	});
	return userSignUp.validate(signup, options);
};

const validateSignIn = (signIn: ILogin) => {
	const userSignIn = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().min(6).max(36).required()
	});
	return userSignIn.validate(signIn, options);
};



export {
	validateSignUp, validateSignIn
};