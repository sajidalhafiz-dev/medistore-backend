import { Router } from "express";
import { orderItemController } from "./orderItem.controller";
const orderItemRouter = Router();

orderItemRouter.post("/", orderItemController.createOrderItem)
orderItemRouter.get("/", orderItemController.getOrderItems)
orderItemRouter.patch("/:id", orderItemController.updateOrderItems)
orderItemRouter.delete("/:id", orderItemController.deleteOrderItems)

export default orderItemRouter;