import { prisma } from "../../lib/prisma";

const createReview = (data: any) =>
    prisma.review.create({ data });

const getReviews = () =>
    prisma.review.findMany({ include: { medicine: true, user: true } });

const deleteReview = (id: string) =>
    prisma.review.delete({where: {id}})

export const reviewService = {
    createReview,
    getReviews,
    deleteReview
}