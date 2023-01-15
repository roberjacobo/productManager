import { Router } from "express";
const router = Router();

import cartMan from "../../jobs/CartManager.js";
const cartManager = new cartMan("./src/models/carts.json");

router.post("/", (req, res) => {
  const cart = {
    products: req.body,
  };
  res.status(200).send(cartManager.addCart(cart));
});

router.get("/", (req, res) => {
  const limit = req.query.limit;
  res.status(200).send(cartManager.getCarts(limit));
});

router.get("/:cid", (req, res) => {
  const id = req.params.cid;
  res.status(200).send(cartManager.getCartById(id));
});

router.post("/:cid/product/:pid", (req, res) => {
  const cart = {
    id: Number(req.params.cid),
    product: {
      id: req.params.pid,
      quantity: req.body.quantity ? req.body.quantity : 1,
    },
  };
  res.status(200).send(cartManager.addCartWithProduct(cart));
});

export default router;
