import { Router } from "express";
import userRouter from "../modules/user/user.route";
import medicineRouter from "../modules/medicine/medicine.route";
import categoryRouter from "../modules/category/category.route";
import orderRouter from "../modules/order/order.route";

const routes = Router()

routes.use("/user", userRouter)
routes.use("/category", categoryRouter)
routes.use("/medicine", medicineRouter)
routes.use("/order", orderRouter)


export default routes;

