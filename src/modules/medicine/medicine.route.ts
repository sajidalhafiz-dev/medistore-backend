import { Router } from "express";
import { medicineController } from "./medicine.controller";

const medicineRouter = Router();

medicineRouter.post("/", medicineController.createMedicine)

export default medicineRouter;