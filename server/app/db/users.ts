import pg from "../config/pg";

const table = `CREATE TABLE IF NOT EXISTS users (
   id serial,
   name VARCHAR(255) NOT NULL,
   email VARCHAR(500) NOT NULL UNIQUE,
   password VARCHAR(455) NOT NULL,
   wishlist TEXT [],
   my_orders TEXT [],
   order_history TEXT [],
   PRIMARY KEY (id)
)`;

const index = `CREATE UNIQUE INDEX email_index ON users (email)`;

const createUsers = async () => {
  try {
	const p1 = await pg.query(table);
	const p2 = await pg.query(index);

	console.log("Users table created");
  } catch (error) {
	console.log(error);
  };
};

export {createUsers};