import { Router } from "express";
import { AuthRouter } from "./AuthRouter";
import { ProductRouter } from "./ProductRouter";

const router = Router();

router.use("/auth", AuthRouter);

router.use("/product", ProductRouter);

export { router as API };
