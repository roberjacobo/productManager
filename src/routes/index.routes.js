const { Router } = require("express");
const cartsRoutes = require("./carts/carts.routes");
const productsRoutes = require("./products/products.routes");

const router = Router();

router.use('/carts', cartsRoutes);
router.use('/products', productsRoutes);

module.exports = router;
