import type { Request, Response, NextFunction as NF } from "express";
import pg from "../config/pg";

const removeFromOrders = async (req: Request, res: Response, next: NF) => {
  const { productId, userId, del } = req.body;

  try {
    if (del) {
      await pg.query(
        `DELETE FROM userdata WHERE 
         type = $1 AND userId = $2 AND productId = $3`,
        ["order", userId, productId]
      );
      return res.status(200).json("deleted");
    }

    await pg.query(
      `UPDATE userdata SET quantity = quantity - 1
       WHERE type = $1 AND userId = $2 AND productId = $3`,
      ["order", userId, productId]
    );
    
    return res.status(200).json("updated");
  } catch (error) {
    next(error);
  }
};

export default removeFromOrders;
