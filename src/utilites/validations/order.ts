import Joi from "joi";
import { IOrder, IUpdateOrder } from "../utils/interface";

const options = {
	stripUnknown: true,
	abortEarly: false,
	errors: {
		wrap: {
			label: ""
		}
	}

};

const validateCreateOrder = (order: IOrder) => {
	const createOrder = Joi.object({
		title: Joi.string().max(100).required(),
		deliveryAdress: Joi.string().required(),
	});
	return createOrder.validate(order, options);
};
const validateUpdateOrder = (order: IUpdateOrder) => {
	const updateOrder = Joi.object({
		title: Joi.string().max(100).required(),
		deliveryAdress: Joi.string().required(),
		status:  Joi.string().valid("pending", "complete")
	});
	return updateOrder.validate(order, options);
}

export  {validateCreateOrder, validateUpdateOrder}