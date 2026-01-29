import { RequestHandler } from "express";
import { prisma } from "../../lib/prisma";

const register: RequestHandler = async (req, res) => {
    try {
        const payload = req.body;

        const user = await prisma.user.create({
            data: payload
        });
        res.send({
            message: "User registered successfully!",
            data: user
        })
    } catch (error) {
        console.error(error)
    }
}


export const userController = {
    register,
}