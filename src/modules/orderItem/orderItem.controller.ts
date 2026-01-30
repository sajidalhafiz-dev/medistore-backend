import { RequestHandler } from "express";
import { orderItemService } from "./orderItem.service";


const createOrderItem: RequestHandler = async (req, res,) => {
    try {
        const data = await orderItemService.createOrderItem(req.body)
        res.send({
            message: "OrderItem created",
            data: data,
        });
    } catch (e) {
        console.error(e)
        res.status(400).json({
            error: "message",
            details: e
        })
    }
}

const getOrderItems: RequestHandler = async (req, res) => {
    try {
        const data = await orderItemService.getOrderItems()
        res.send({
            message: "All OrderItems",
            data
        });
    } catch (e) {
        console.error(e)
        res.status(400).json({
            error: "message",
            details: e
        })
    }
}

const updateOrderItems: RequestHandler = async (req, res) => {
    try {
        const data = await orderItemService.updateOrderItem(req.params.id as string, req.body)
        res.status(200).json({ message: "OrderItem updated", data });
    } catch (e) {
        console.error(e)
        res.status(400).json({
            error: "message",
            details: e
        })
    }
}

const deleteOrderItems: RequestHandler = async (req, res) => {
    try {
        const data = await orderItemService.deleteOrderItem(req.params.id as string)
    } catch (e) {
        console.error(e)
        res.status(400).json({
            error: "message",
            details: e
        })
    }
}


export const orderItemController = {
    createOrderItem,
    getOrderItems,
    updateOrderItems,
    deleteOrderItems
}