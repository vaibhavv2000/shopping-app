import { Pool } from "pg";
import "dotenv/config";

const pg = new Pool({
  host: process.env.DB_HOST,
  port: 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: "shopping",
});

pg.on("connect", () => console.log("Connected to pg"));

pg.on("error", (err) => console.log(err));

export default pg;
