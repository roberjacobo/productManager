const { Router } = require("express");
const cartsRoutes = require("./carts/carts.routes");
const productsRoutes = require("./products/products.routes");

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/realTimeProducts", (req, res) => {
  res.render("realTimeProducts");
});

router.use("/carts", cartsRoutes);
router.use("/products", productsRoutes);

module.exports = router;
