import type { Request, Response, NextFunction as NF } from "express";
import pg from "../config/pg";

const removeFromCart = async (req: Request, res: Response, next: NF) => {
  const { productId, userId } = req.body;

  try {
    await pg.query(
      `DELETE FROM userdata WHERE type = $1 AND userId = $2 AND productId = $3`,
      ["wish", userId, productId]
    );

    return res.status(200).json("deleted");
  } catch (error) {
    next(error);
  }
};

export default removeFromCart;
