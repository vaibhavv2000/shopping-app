import pg from "../config/pg";

const createDB = async () => {
  try {
    await pg.query(`CREATE DATABASE shopping`);
    console.log("Shopping DB created");
  } catch (error) {
    console.log(error);
  };
};
  
export {createDB};