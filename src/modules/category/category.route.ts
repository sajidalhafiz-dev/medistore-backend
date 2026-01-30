import { Router } from "express";
import { categoryController } from "./category.controller";

const categoryRouter = Router();

categoryRouter.post("/", categoryController.createCategory)
categoryRouter.get("/", categoryController.getCategory)
categoryRouter.delete("/:id", categoryController.deleteCategory)

export default categoryRouter;