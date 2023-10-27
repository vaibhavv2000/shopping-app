import type { Request, Response, NextFunction as NF } from "express";
import pg from "../config/pg";

const addToCart = async (req: Request, res: Response, next: NF) => {
  const { productId, userId } = req.body;

  try {
    const nw = await pg.query(
      `INSERT INTO userdata (userId, productId, type) VALUES ($1, $2, $3)`,
      [userId, productId, "wish"]
    );
    return res.status(201).json("Added");
  } catch (error) {
    next(error);
  }
};

export default addToCart;
