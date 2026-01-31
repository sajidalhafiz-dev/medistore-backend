import { Router } from "express";
import { medicineController } from "./medicine.controller";
import auth from "../../middlewares/auth";

const medicineRouter = Router();

medicineRouter.post("/", auth("medicine", "create"), medicineController.createMedicine)
medicineRouter.get("/", auth("medicine", "read"), medicineController.getMedicine)
medicineRouter.patch("/:id", auth("medicine", "update"), medicineController.updateMedicine)
medicineRouter.delete("/:id", auth("medicine", "delete"), medicineController.deleteMedicine)

export default medicineRouter;