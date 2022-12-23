const express = require("express");
const app = express();
const port = 3000;

const prodMan = require("./ProductManager");
const manager = new prodMan("./data/products.json");

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.get("/products", (req, res) => {
  res.status(200).send(manager.getProducts());
});

app.get("/products?limit=10", (req, res) => {
  res.status(200).send(manager.getProducts());
});


app.get("/products/:id", (req, res) => {
  let id = req.params.id;
  res.status(200).send(manager.getProductById(id));
});

app.post("/addProduct", (req, res) => {
  let title = req.query.title;
  let description = req.query.description;
  let price = req.query.price;
  let thumbnail = req.query.thumbnail;
  let code = req.query.code;
  let stock = req.query.stock;
  res.status(200).send(manager.addProduct(title, description, price, thumbnail, code, stock));
});

app.put("/updateProduct/:id", (req, res) => {
  let id = req.params.id;
  let title = req.query.title;
  let description = req.query.description;
  let price = req.query.price;
  let thumbnail = req.query.thumbnail;
  let code = req.query.code;
  let stock = req.query.stock;
  res.status(200).send(manager.updateProduct(id, title, description, price, thumbnail, code, stock));
});

app.delete("/deleteProduct/:id", (req, res) => {
  let id = req.params.id;
  res.status(200).send(manager.deleteProduct(id));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
