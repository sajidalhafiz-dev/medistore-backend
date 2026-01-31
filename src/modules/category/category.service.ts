import { prisma } from "../../lib/prisma";


const createCategory = (data: any) => {
  return prisma.category.create({ data });
};

const getCategories = () => {
  return prisma.category.findMany();
};

const updateCategory = (id: string, data: any) => {
  return prisma.category.update({
    where: { id },
    data,
  });
};

const deleteCategory = (id: string) => {
  return prisma.category.delete({
    where: { id },
  });
};

export const categoryService = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
