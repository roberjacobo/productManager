const { Router } = require("express");
const router = Router();

const ProductManager = require("../../jobs/ProductManager.js");
const prodManager = new ProductManager("./src/models/products.json");

router.get("/", (req, res) => {
  const limit = req.query.limit;
  res.status(200).send(prodManager.getProducts(limit));
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const resProd = prodManager.getProductById(id);
  res.status(200).send(resProd);
});

router.post("/", (req, res) => {
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
  const resProd = prodManager.addProduct(prod);
  res.status(200).send(resProd);
  return "Product added successfully!";
});

router.put("/:id", (req, res) => {
  const prod = {
    id: Number(req.params.id),
    title: req.body.title,
    description: req.body.description,
    code: req.body.code,
    price: req.body.price,
    status: req.body.status,
    stock: req.body.stock,
    category: req.body.category,
    thumbnails: req.body.thumbnails,
  };
  const resProd = prodManager.updateProduct(prod);
  res.status(200).send(resProd);
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const resProd = prodManager.deleteProduct(id)
  res.status(200).send(resProd);
  return "Product deleted successfully!";
});

module.exports = router;
