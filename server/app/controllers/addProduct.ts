import type { Request, Response, NextFunction as NF } from "express";
import pg from "../config/pg";

const addProduct = async (req: Request, res: Response, next: NF) => {
  const { type, name, description, image, price } = req.body;

  if (!type || !name || !description || !image || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const add = await pg.query(
      `INSERT INTO products (product_name, type, description, image, price) 
       VALUES ($1, $2 ,$3, $4, $5)`,
      [name, type, description, image, price]
    );

    return res.status(201).json("Added");
  } catch (error) {
    next(error);
  }
};

export default addProduct;
