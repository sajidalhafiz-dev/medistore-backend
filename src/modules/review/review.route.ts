import { Router } from "express";
import { reviewController } from "./review.controller";
import auth from "../../middlewares/auth";

const reviewRouter = Router();

reviewRouter.post("/", auth("review", "create"), reviewController.createReview)
reviewRouter.get("/", auth("review", "create"), reviewController.getReviews)
reviewRouter.delete("/:id", auth("review", "create"), reviewController.deleteReview)

export default reviewRouter;