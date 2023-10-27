import { Request, Response, Router, NextFunction as NF } from "express";
import pg from "../config/pg";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";

const router = Router();

router.post("/register", async (req: Request, res: Response, next: NF) => {
  const { email, name, password } = req.body;

  if (!name || !password || !email) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const get_user = await pg.query(
      `SELECT email FROM users WHERE email = $1`,
      [email]
    );

    if (get_user.rows[0]) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt: string = await bcrypt.genSalt(10);
    const hash: string = await bcrypt.hash(password, salt);

    const new_user = await pg.query(
      `INSERT INTO users (name, email, password) VALUES
      ($1, $2, $3) RETURNING id`,
      [name, email, hash]
    );

    const user = new_user.rows[0];

    const token = jwt.sign(
      { id: user.id, email: email },
      process.env.JWT_KEY as string,
      {
        expiresIn: "1m",
      }
    );

    const user_data = { email, name, id: user.id };

    return res.status(201).json({ user: user_data, token });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req: Request, res: Response, next: NF) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await pg.query(
      `SELECT name, email, id, password FROM users WHERE email = $1`,
      [email]
    );

    if (!user.rows[0]) {
      return res.status(400).json({ error: "No user found" });
    }

    const pwd: boolean = await bcrypt.compare(password, user.rows[0].password);

    if (!pwd) return res.status(400).json({ error: "Wrong PWD" });

    let u = user.rows[0];

    const token = jwt.sign(
      { id: u.id, email: email },
      process.env.JWT_KEY as string,
      {
        expiresIn: "1m",
      }
    );

    const user_data = { email, name: u.name, id: u.id };

    return res.status(201).json({ user: user_data, token });
  } catch (error) {
    next(error);
  }
});

export { router as AuthRouter };
