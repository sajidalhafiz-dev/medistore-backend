import { prisma } from "../../lib/prisma";

const createMedicine = (data: any) =>
    prisma.medicine.create({ data });

const getMedicines = () =>
    prisma.medicine.findMany({ include: { seller: true, category: true } });

const updateMedicine = (id: string, data: any) =>
    prisma.medicine.update({ where: { id }, data });

const deleteMedicine = (id: string) =>
    prisma.medicine.delete({ where: { id } });


export const medicineService = {
    createMedicine,
    getMedicines,
    updateMedicine,
    deleteMedicine,
};