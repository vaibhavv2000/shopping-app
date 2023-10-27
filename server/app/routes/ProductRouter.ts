import { Router } from "express";
import addProduct from "../controllers/addProduct";
import fetchProducts from "../controllers/fetchProducts";
import addToCart from "../controllers/addToCart";
import removeFromCart from "../controllers/removeFromCart";
import fetchUserData from "../controllers/getUserData";
import addToOrder from "../controllers/addToOrders";
import removeFromOrders from "../controllers/removeFromOrder";
import payment from "../controllers/payment";
import confirmOrder from "../controllers/confirmOrder";

const router: Router = Router();

router.post("/addproduct", addProduct);

router.get("/fetchproducts", fetchProducts);

router.post("/addtowishlist", addToCart);

router.post("/removefromwishlist", removeFromCart);

router.get("/getuserdata", fetchUserData);

router.post("/addorder", addToOrder);

router.post("/removefromorder", removeFromOrders);

router.post("/confirmorder", confirmOrder)

router.post("/payment", payment);

export {router as ProductRouter};
