import { Router } from "express";
import { orderItemController } from "./orderItem.controller";
import auth from "../../middlewares/auth";
const orderItemRouter = Router();

orderItemRouter.post("/", auth("orderItem", "create"), orderItemController.createOrderItem)
orderItemRouter.get("/", auth("orderItem", "read"), orderItemController.getOrderItems)
orderItemRouter.patch("/:id", auth("orderItem", "update"), orderItemController.updateOrderItems)
orderItemRouter.delete("/:id", auth("orderItem", "delete"), orderItemController.deleteOrderItems)

export default orderItemRouter;