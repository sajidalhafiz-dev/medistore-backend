import { RequestHandler } from "express";
import { prisma } from "../../lib/prisma";

// try {

// } catch (e) {
//     console.log(e)
//     res.status(400).json({
//         error: "message",
//         details: e
//     })
// }

const register: RequestHandler = async (req, res) => {
  const payload = req.body;

  try {
    const user = await prisma.user.create({
      data: payload,
    });
    res.send({
      message: "User registered successfully!",
      data: user,
    });

  } catch (e) {
    console.log(e)
    res.status(400).json({
      error: "message",
      details: e
    })
  }
};

const getUsers: RequestHandler = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { medicines: true, orders: true, reviews: true }
    });
    res.send({
      message: "All User",
      data: users,
    });
  } catch (e) {
    console.log(e)
    res.status(400).json({
      error: "message",
      details: e
    })
  }
}



export const userController = {
  register,
  getUsers
};
