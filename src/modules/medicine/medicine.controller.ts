import { RequestHandler } from "express";
import { prisma } from "../../lib/prisma";

const createMedicine: RequestHandler = async (req, res) => {

    try {
        const payload = req.body;
        const medicine = await prisma.medicine.create({
            data: payload
        })

        res.send({
            mesaage: "Medicine Added Successfully.",
            data: medicine
        })
    } catch (error) {
        console.error(error)
    }
}

export const medicineController = {
    createMedicine,
}