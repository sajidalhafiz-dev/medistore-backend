import { RequestHandler } from "express";
import { prisma } from "../../lib/prisma";
import { reviewService } from "./review.service";


const createReview: RequestHandler = async (req, res) => {
    try {
        const data = await reviewService.createReview(req.body);
        res.status(201).json({ message: "Review created.", data: data })
    } catch (e) {
        console.error(e)
        res.status(400).json({
            error: "message",
            details: e
        })
    }
}

const getReviews: RequestHandler = async (req, res) => {
    try {
        const data = await reviewService.getReviews()
        res.status(200).json({ message: "All reviews", data })
    } catch (e) {
        console.error(e)
        res.status(400).json({
            error: "message",
            details: e
        })
    }
}

const deleteReview: RequestHandler = async (req, res,) => {
    try {
        const data = await reviewService.deleteReview(req.params.id as string)
        res.status(200).json({ message: "Review deleted.", data })
    } catch (e) {
        console.error(e)
        res.status(400).json({
            error: "message",
            details: e
        })
    }
}


export const reviewController = {
    createReview,
    getReviews,
    deleteReview
}