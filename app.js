const express = require("express");

const app = express();
const port = 3001;

const prodMan = require("./ProductManager.js");
const manager = new prodMan("./data/products.json");
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/products", (req, res) => {
  let limit = req.query.limit;
  res.status(200).send(manager.getProducts(limit));
});

app.get("/products/:id", (req, res) => {
  let id = req.params.id;
  res.status(200).send(manager.getProductById(id));
});

app.post("/addProduct", (req, res) => {
  const prod = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    thumbnail: req.body.thumbnail,
    code: req.body.code,
    stock: req.body.stock,
  };
  res.status(200).send(manager.addProduct(prod));
});

app.put("/updateProduct/:id", (req, res) => {
  const prod = {
    id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    thumbnail: req.body.thumbnail,
    code: req.body.code,
    stock: req.body.stock,
  };
  res.status(200).send(manager.updateProduct(prod));
});

app.delete("/deleteProduct/:id", (req, res) => {
  let id = req.params.id;
  res.status(200).send(manager.deleteProduct(id));
});
