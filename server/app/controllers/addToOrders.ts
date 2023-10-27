import type { Request, Response, NextFunction as NF } from "express";
import pg from "../config/pg";

const addToOrder = async (req: Request, res: Response, next: NF) => {
  const { productId, userId, incr, decr } = req.body;

  console.log({productId, userId, incr});

  try {
    if (incr) {
      await pg.query(
        `UPDATE userdata SET quantity = quantity + 1 WHERE 
         type = $1 AND userId = $2 AND productId = $3`,
        ["order", userId, productId]
      );
      return res.status(201).json("Increased Quantity");
    };

    if(decr) {
      await pg.query(
        `UPDATE userdata SET quantity = quantity - 1 WHERE 
         type = $1 AND userId = $2 AND productId = $3`,
        ["order", userId, productId]
      );
      return res.status(201).json("Decreased Quantity");
    };

    const { rows } = await pg.query(
      `SELECT * FROM userdata WHERE 
       type = $1 AND userId = $2 AND productId = $3`,
      ["order", userId, productId]
    );

    if (!rows[0]) {
      await pg.query(
        `INSERT INTO userdata (userId, productId, type, quantity) 
         VALUES ($1, $2, $3, $4)`,
        [userId, productId, "order", 1]
      );
    }

    return res.status(201).json("Added");
  } catch (error) {
    console.log("error", error.message)
    next(error);
  }
};

export default addToOrder;
