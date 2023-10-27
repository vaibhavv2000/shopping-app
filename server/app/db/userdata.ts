import pg from "../config/pg";

const productType = `CREATE TYPE product_type AS ENUM ('order','wish','history')`;

const table = `CREATE TABLE userdata (
  id SERIAL PRIMARY KEY,
  userId INT NOT NULL,
  productId INT NOT NULL,
  type product_type NOT NULL,
  FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY(productId) REFERENCES products(id) ON DELETE CASCADE
)`;

const q = `ALTER TABLE userdata ADD COLUMN quantity INT`

const createUserData = async () => {
  try {
	 const p1 = await pg.query(productType);
	 const p2 = await pg.query(table);
	 const p3 = await pg.query(q);
	 console.log("UsersData table created");
  } catch (error) {
	 console.log(error);
  };
};
  
export {createUserData};