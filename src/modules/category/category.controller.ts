import { RequestHandler } from "express";
import { categoryService } from "./category.service";


const createCategory: RequestHandler = async (req, res) => {
    try {
        const data = await categoryService.createCategory(req.body);
        res.status(201).json({ message: "Category created", data });

    } catch (e) {
        console.log(e)
        res.status(400).json({
            error: "message",
            details: e
        })
    }
};

const getCategory: RequestHandler = async (req, res) => {
    try {
        const data = await categoryService.getCategories();
        res.status(200).json({ message: "All categories", data });

    } catch (e) {
        console.log(e)
        res.status(400).json({
            error: "message",
            details: e
        })
    }
};

const updateCategory: RequestHandler = async (req, res) => {
    try {
        const data = await categoryService.updateCategory(req.params.id as string, req.body);
        res.json({ message: "Category updated", data });

    } catch (e) {
        console.log(e)
        res.status(400).json({
            error: "message",
            details: e
        })
    }
};

const deleteCategory: RequestHandler = async (req, res) => {
    try {
        const data = await categoryService.deleteCategory(req.params.id as string);
        res.status(200).json({ message: "Category deleted", data });

    } catch (e) {
        console.log(e)
        res.status(400).json({
            error: "message",
            details: e
        })
    }
};

export const categoryController = {
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
}