const fs = require("fs");

class ProductManager {
  static idCounter = 0;

  constructor(path) {
    this.path = path;
    this.products = new Array();
  }

  getProducts(limit) {
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    if (!this.products.length) {
      console.log("Products list is empty");
    } else {
      console.log(this.products.slice(0, limit));
    }
  }

  addProduct(product) {
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    let found = this.products.find((element) => element.code === product.code);
    if (found === undefined) {
      if (!this.products.length) {
        ProductManager.idCounter = 1;
      } else {
        ProductManager.idCounter =
          this.products[this.products.length - 1].id ++;
      }

      const newProduct = {
        id: ProductManager.idCounter,
        ...product,
      };

      this.products.push(newProduct);
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
      console.log("Product created successfully!");
    } else {
      console.log("Product already exists");
    }
  }

  getProductById(id) {
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    let found = this.products.find((element) => element.id === Number(id));
    if (found) {
      console.log(found);
    } else {
      console.log("Product not found");
    }
  }

  updateProduct(product) {
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    let found = this.products.find(
      (element) => element.id === Number(product.id)
    );
    if (found) {
      found.title = product.title;
      found.description = product.description;
      found.code = product.code;
      found.price = product.price;
      found.status = product.status;
      found.stock = product.stock;
      found.category = product.category;
      found.thumbnails = product.thumbnails;
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
      console.log("Product updated successfully!");
    } else {
      console.log("Product not found");
    }
  }

  deleteProduct(id) {
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    let found = this.products.find((product) => product.id === Number(id));
    if (found) {
      this.products = this.products.filter(
        (product) => product.id !== Number(id)
      );
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
      console.log("Product deleted successfully!");
    } else {
      console.log("Product not found");
    }
  }

  // end class
}

module.exports = ProductManager;
