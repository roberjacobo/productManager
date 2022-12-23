const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.id = 1;
    this.products = new Array();
  }

  getProducts() {
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    if (this.products.length === 0) {
      console.log("Products list is empty");
    } else {
      console.log(this.products);
    }
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    let found = this.products.find((product) => product.code === code);
    if (found === undefined) {
      this.products.push({
        id: this.id,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
      });
      this.id++;
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    } else {
      console.log("Product already exists");
    }
  }

  getProductById(id) {
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    let found = this.products.find((product) => product.id === id);
    if (found) {
      console.log(found);
    } else {
      console.log("Product not found");
    }
  }

  updateProduct(id, title, description, price, thumbnail, code, stock) {
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    let found = this.products.find((product) => product.id === id);
    if (found) {
      found.title = title;
      found.description = description;
      found.price = price;
      found.thumbnail = thumbnail;
      found.code = code;
      found.stock = stock;
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    } else {
      console.log("Product not found");
    }
  }

  deleteProduct(id) {
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    let found = this.products.find((product) => product.id === id);
    if (found) {
      this.products = this.products.filter((product) => product.id !== id);
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    } else {
      console.log("Product not found");
    }
  }

  // end class
}

module.exports = ProductManager;

// let prod = new ProductManager("./data/products.json");
// prod.getProducts();
// prod.addProduct(
//   "producto prueba",
//   "Este es un producto prueba",
//   200,
//   "No image available",
//   "abc123",
//   25
// );

// prod.addProduct(
//   "producto prueba 2",
//   "Este es un producto prueba",
//   900,
//   "No image available",
//   "abc456",
//   50
// );

// prod.getProductById(2);

// prod.updateProduct(
//   3,
//   "producto prueba 2 UPDATED",
//   "Este es un producto prueba",
//   200,
//   "No image available",
//   "abc456",
//   100
// );

// prod.getProducts();

// prod.deleteProduct(1);
// prod.deleteProduct(2);
