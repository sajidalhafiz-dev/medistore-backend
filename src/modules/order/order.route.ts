import { Router } from "express";
import { orderController } from "./order.controller";
import auth from "../../middlewares/auth";

const orderRouter = Router();

orderRouter.post("/", auth("order", "create"), orderController.createOrder)
orderRouter.get("/", auth("order", "read"), orderController.getOrders)
orderRouter.patch("/:id", auth("order", "update"), orderController.updateOrder)
orderRouter.delete("/:id", auth("order", "delete"), orderController.deleteOrder)

export default orderRouter