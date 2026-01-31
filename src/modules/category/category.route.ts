import { Router } from "express";
import { categoryController } from "./category.controller";
import auth from "../../middlewares/auth";

const categoryRouter = Router();

categoryRouter.post("/", auth("category", "create"), categoryController.createCategory)
categoryRouter.get("/", categoryController.getCategory)
categoryRouter.patch("/:id", categoryController.updateCategory)
categoryRouter.delete("/:id", categoryController.deleteCategory)

export default categoryRouter;