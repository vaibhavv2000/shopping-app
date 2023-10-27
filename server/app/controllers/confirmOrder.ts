import type { Request, Response, NextFunction as NF } from "express";
import pg from "../config/pg";

const confirmOrder = async (req: Request, res: Response, next: NF) => {
  const { userId } = req.body;

  try {
    await pg.query(`UPDATE userdata SET type = $1 WHERE userid = $2`,["history", userId]);

    return res.status(200).json("ok");
  } catch (error) {
    next(error);
  }
};

export default confirmOrder;
