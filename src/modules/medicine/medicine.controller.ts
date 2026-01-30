import { RequestHandler } from "express";
import { medicineService } from "./medicine.service";


const createMedicine: RequestHandler = async (req, res) => {
    try {
        const data = await medicineService.createMedicine(req.body);
        res.json({ message: "Medicine created", data });

    } catch (e) {
        console.log(e)
        res.status(400).json({
            error: "message",
            details: e
        })
    }
};

const getMedicine: RequestHandler = async (req, res) => {
    try {
        const data = await medicineService.getMedicines();
        res.status(200).json({ message: "All medicines", data });

    } catch (e) {
        console.log(e)
        res.status(400).json({
            error: "message",
            details: e
        })
    }
};

const updateMedicine: RequestHandler = async (req, res) => {

    try {
        const data = await medicineService.updateMedicine(req.params.id as string, req.body);
        res.status(200).json({ message: "Medicine updated", data });

    } catch (e) {
        console.log(e)
        res.status(400).json({
            error: "message",
            details: e
        })
    }
};

const deleteMedicine: RequestHandler = async (req, res) => {
    try {
        const data = await medicineService.deleteMedicine(req.params.id as string);
        res.status(200).json({ message: "Medicine deleted", data });

    } catch (e) {
        console.log(e)
        res.status(400).json({
            error: "message",
            details: e
        })
    }
};

export const medicineController = {
    createMedicine,
    getMedicine,
    updateMedicine,
    deleteMedicine
}