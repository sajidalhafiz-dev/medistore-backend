import { Router } from "express";
import { medicineController } from "./medicine.controller";

const medicineRouter = Router();

medicineRouter.post("/", medicineController.createMedicine)
medicineRouter.get("/", medicineController.getMedicine)
medicineRouter.patch("/:id", medicineController.updateMedicine)
medicineRouter.delete("/:id", medicineController.deleteMedicine)

export default medicineRouter;