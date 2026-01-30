import { Router } from "express";
import { reviewController } from "./review.controller";

const reviewRouter = Router();

reviewRouter.post("/", reviewController.createReview)
reviewRouter.get("/", reviewController.getReviews)
reviewRouter.delete("/:id", reviewController.deleteReview)

export default reviewRouter;