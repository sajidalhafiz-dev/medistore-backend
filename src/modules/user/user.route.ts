import { Router } from "express";
import { userController } from "./user.controller";

const userRouter = Router()

userRouter.post("/register", userController.register)
userRouter.get("/", userController.getUsers)

export default userRouter