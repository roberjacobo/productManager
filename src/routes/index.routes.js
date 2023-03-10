const { Router } = require("express");
const cartsRoutes = require("./carts/carts.routes");
const productsRoutes = require("./products/products.routes");

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.use("/carts", cartsRoutes);
router.use("/products", productsRoutes);

module.exports = router;
