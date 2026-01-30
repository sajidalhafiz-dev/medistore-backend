import { RequestHandler } from "express";
import { prisma } from "../../lib/prisma";

const createCategory: RequestHandler = async (req, res) => {

    try {
        const payload = req.body;
        const category = await prisma.category.create({
            data: payload
        })

        res.send({
            message: "Category created successfully.",
            data: category
        })
    } catch (error) {
        console.error(error)
    }
}


const getCategory: RequestHandler = async (req, res) => {
    try {
        const data = await prisma.category.findMany();
        res.send({
            message: "All Categories.",
            data
        })
    } catch (error) {
        console.error(error)
    }
}

const deleteCategory: RequestHandler = async (req, res) => {
    try {
        const id: any = req.params.id
        const data = await prisma.category.delete({
            where: {
                id: id,
            }
        })
        res.send({
            message: `CategoryID: ${id} is deleted.`,
            data
        })
    } catch (error) {
        console.error(error)
    }
}

export const categoryController = {
    createCategory,
    getCategory,
    deleteCategory
}