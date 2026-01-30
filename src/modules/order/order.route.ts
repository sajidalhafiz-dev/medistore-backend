import { Router } from "express";
import { orderController } from "./order.controller";

const orderRouter = Router();

orderRouter.post("/", orderController.createOrder)
orderRouter.get("/", orderController.getOrders)
orderRouter.patch("/:id", orderController.updateOrder)
orderRouter.delete("/:id", orderController.deleteOrder)

export default orderRouter