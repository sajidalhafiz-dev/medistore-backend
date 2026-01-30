import { prisma } from "../../lib/prisma";

const createOrderItem = (data: any) => 
    prisma.orderItem.create({data});

const getOrderItems = () =>
    prisma.orderItem.findMany({ include: {order: true, medicine: true}});

const updateOrderItem = (id: string, data: any) =>
    prisma.orderItem.update({where: {id}, data})

const deleteOrderItem = (id: string) =>
    prisma.orderItem.delete({where: {id}})


export const orderItemService = {
    createOrderItem,
    getOrderItems,
    updateOrderItem,
    deleteOrderItem
}