import { prisma } from "../../lib/prisma";


const createOrder = (data: any) =>
    prisma.order.create({ data });

const getOrders = () =>
    prisma.order.findMany({ include: { customer: true, items: true } });

const updateOrder = (id: string, data: any) =>
    prisma.order.update({
        where: { id },
        data
    })


const deleteOrder = (id: string) =>
    prisma.order.delete({ where: { id } });



export const orderService = {
    createOrder,
    getOrders,
    updateOrder,
    deleteOrder
};