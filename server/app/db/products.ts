import pg from "../config/pg";

const table = `CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(1000) NOT NULL,
  price INT NOT NULL,
  description VARCHAR(3000),
  image VARCHAR(20000) NOT NULL
)`;

const index = `CREATE INDEX pro_in ON products(id)`;

const type = `ALTER TABLE products ADD COLUMN type VARCHAR(300)`; 
// type - clothes | mobile | watch

const rating = `ALTER TABLE products ADD COLUMN rating FLOAT DEFAULT 4.0`;

const createProducts = async () => {
  try {
    const p1 = await pg.query(table);
    const p2 = await pg.query(index);
    const p3 = await pg.query(type);
    const p4 = await pg.query(rating);

    console.log("Products table created");
  } catch(error) {
    console.log(error);
  };
};

export {createProducts};