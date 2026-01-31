import { Router } from "express";
import { categoryController } from "./category.controller";
import auth from "../../middlewares/auth";

const categoryRouter = Router();

categoryRouter.post("/", auth("category", "create"), categoryController.createCategory)
categoryRouter.get("/", auth("category", "read"), categoryController.getCategory)
categoryRouter.patch("/:id", auth("category", "update"), categoryController.updateCategory)
categoryRouter.delete("/:id", auth("category", "delete"), categoryController.deleteCategory)

export default categoryRouter;