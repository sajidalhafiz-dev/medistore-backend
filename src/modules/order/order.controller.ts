import { RequestHandler } from "express";
import { prisma } from "../../lib/prisma";
import { orderService } from "./order.service";


const createOrder: RequestHandler = async (req, res) => {
    try {
        const data = await orderService.createOrder(req.body)
        res.send({
            message: "Order created",
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

const getOrders: RequestHandler = async (req, res) => {
    try {
        const orders = await orderService.getOrders()
        res.send({
            message: "All Orders",
            data: orders,
        });
    } catch (e) {
        console.error(e)
        res.status(400).json({
            error: "message",
            details: e
        })
    }
}

const updateOrder: RequestHandler = async (req, res) => {
    try {
        const data = await orderService.updateOrder(req.params.id as string, req.body)
        res.status(200).json({ message: "Order updated", data });
    } catch (e) {
        console.error(e)
        res.status(400).json({
            error: "message",
            details: e
        })
    }
}

const deleteOrder: RequestHandler = async (req, res) => {
    try {
        const data = await orderService.deleteOrder(req.params.id as string);
        res.status(200).json({ message: "Order deleted", data });

    } catch (e) {
        console.error(e)
        res.status(400).json({
            error: "message",
            details: e
        })
    }
};


export const orderController = {
    createOrder,
    getOrders,
    updateOrder,
    deleteOrder
}