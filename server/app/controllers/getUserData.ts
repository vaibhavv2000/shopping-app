import type {Request,Response,NextFunction as NF} from "express";
import pg from "../config/pg";

const fetchUserData = async (req: Request,res: Response,next: NF) => {
  const {id} = req.query;

  try {
    const {rows} = await pg.query(`SELECT * FROM userdata WHERE userid = $1`, [id]);

    const wish = rows.filter(p => p.type === "wish");
    const order = rows.filter(p => p.type === "order");
    const history = rows.filter(p => p.type === "history");

    const getData = async (arr: any[]) => {
      return await Promise.all(arr.map(async p => {
        const {rows} = await pg.query(`SELECT * FROM products WHERE id = $1`,[p.productid]);
        return rows[0];
      }));
    };

    const wishlist = await getData(wish);

    const historylist = await Promise.all(history.map(async p => {
      const {rows} = await pg.query(`SELECT * FROM products WHERE id = $1`,[p.productid]);
      return {...rows[0], quantity: p.quantity};
    }));;

    const orderlist =  await Promise.all(order.map(async p => {
      const {rows} = await pg.query(`SELECT * FROM products WHERE id = $1`,[p.productid]);
      return {...rows[0], quantity: p.quantity};
    }));;

    return res.status(200).json({wishlist,orderlist,historylist});
  } catch(error) {
    next(error);
  }
};

export default fetchUserData;
