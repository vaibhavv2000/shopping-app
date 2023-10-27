import type { Request, Response, NextFunction as NF } from "express";
import pg from "../config/pg";

const fetchProducts = async (req: Request, res: Response, next: NF) => {
  try {
    const { rows } = await pg.query(`SELECT * FROM products`);

    return res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

export default fetchProducts;
