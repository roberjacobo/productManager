const express = require("express");

const app = express();
const port = 8080;

// Product Manager
const prodMan = require("./ProductManager.js");
const prodManager = new prodMan("./data/products.json");

// Cart Manager
const cartMan = require("./CartManager.js");
const cartManager = new cartMan("./data/carts.json");

app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Products

app.get("/api/products", (req, res) => {
  const limit = req.query.limit;
  res.status(200).send(prodManager.getProducts(limit));
});

app.get("/api/products/:pid", (req, res) => {
  let id = req.params.pid;
  res.status(200).send(prodManager.getProductById(id));
});

app.post("/api/addProduct", (req, res) => {
  const prod = {
    title: req.body.title,
    description: req.body.description,
    code: req.body.code,
    price: req.body.price,
    status: req.body.status,
    stock: req.body.stock,
    category: req.body.category,
    thumbnails: req.body.thumbnails,
  };
  res.status(200).send(prodManager.addProduct(prod));
});

app.put("/api/updateProduct/:pid", (req, res) => {
  const prod = {
    id: req.params.pid,
    title: req.body.title,
    description: req.body.description,
    code: req.body.code,
    price: req.body.price,
    status: req.body.status,
    stock: req.body.stock,
    category: req.body.category,
    thumbnails: req.body.thumbnails,
  };
  res.status(200).send(prodManager.updateProduct(prod));
});

app.delete("/api/deleteProduct/:id", (req, res) => {
  let id = req.params.id;
  res.status(200).send(prodManager.deleteProduct(id));
  console.log("Product deleted successfully!");
});

// Carts

app.post("/api/addCart", (req, res) => {
  const cart = {
    products: req.body,
  };
  res.status(200).send(cartManager.addCart(cart));
});

app.get("/api/getCarts", (req, res) => {
  const limit = req.query.limit;
  res.status(200).send(cartManager.getCarts(limit));
});

app.get("/api/carts/:cid", (req, res) => {
  const id = req.params.cid;
  res.status(200).send(cartManager.getCartById(id));
});

app.post("/api/carts/:cid/product/:pid", (req, res) => {
  const cart = {
    id: Number(req.params.cid),
    product: {
      id: req.body.product,
      quantity: req.body.quantity
    }
  };
  res.status(200).send(cartManager.addCartWithProduct(cart));
});
