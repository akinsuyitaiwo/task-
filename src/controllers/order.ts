import { Request, Response } from "express";
import { successResponse, errorResponse, handleError } from "../utilites/utils/responses";
import { validateCreateOrder,validateUpdateOrder } from "../utilites/validations/order";
import models from "../model";


export const createOrder = async(req: Request, res: Response) =>{
    try {
        const { id } = req.user;
        const {error, value} = validateCreateOrder(req.body);
        if(error) {
            return errorResponse( res, 400, error.message);
        }
        const {title, deliveryAdress} = value
        console.log(value)
        const order = await models.Order.create({
            userId : id,
            title,
            deliveryAdress,
        })
        console.log(order)
        return successResponse(res, 201, "Order created successfully",{order} )
    } catch (error) {
        console.log(error)
        return errorResponse(res, 500, "Internal server error");
    }
}
export const viewOrder = async(req: Request, res: Response)=>{
    try {
        const {orderId} = req.params;
        const findOrder = await models.Order.findOne({where: {id: orderId}});
        if(!findOrder) {
            return errorResponse(res, 404, "order not found")
            }
        return successResponse(res, 200, "Order found successfully", findOrder)
    } catch (error) {
        return errorResponse( res, 500, "internal server error")
    }
}   
export const viewOrders = async(req: Request, res: Response) =>{
    try {
        const page = parseInt(req.query.page as string) || 1;
		const pageSize = 10;
		const offset = (page - 1) * pageSize;

		const orders = await models.Order.findAndCountAll({
			where: {
				active: true
			},
			limit: pageSize,
			offset,
		});

		if (!orders || orders.count === 0) {
			return errorResponse(res, 404, "Orders not found");
		}

		return successResponse(res, 200, "Orders fetched successfully", {
			totalItems: orders.count,
			currentPage: page,
			totalPages: Math.ceil(orders.count / pageSize),
			orders: orders.rows,
		});
    } catch (error) {
        return errorResponse(res, 500, "internal server error")
    }
} 
export const updateOrder = async(req: Request, res: Response) =>{
    try {
        const { id } = req.user
        const { orderId } = req.params
        const {error, value} = validateUpdateOrder(req.body)
        if(error){
            return errorResponse(res, 400, error.message);
        }
        const order = await models.Order.findOne({where: {id: orderId,
        userid : id}})
        if (!order) {
            return errorResponse(res, 404, "Order not found")
        }
        await order.update(value);
        return successResponse(res, 200,"Order updated Successfully!", order)
    } catch (error) {
        return errorResponse(res, 500, 'Server Error')
    }
}
export const deleteOrder = async(req: Request, res: Response) =>{
    try {
        const { id } = req.user
        const {orderId} = req.params
        const order = await models.Order.findOne({
			where: {
				id: orderId,
				userId: id
			}
		});

		if (!order) {
			return errorResponse(res, 404, "Order not found");
		}

		await order.update({
			active: false
		});

		return successResponse(res, 200, "Order deleted successfully");
    } catch (error) {
        return errorResponse(res, 500, 'Server Error')
    }
}