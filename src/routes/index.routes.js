import { Router } from "express";
import cartsRoutes from "./carts/carts.routes.js";
import productsRoutes from "./products/products.routes.js";

const router = Router();

router.use("/carts", cartsRoutes);
router.use("/products", productsRoutes);

export default router;
