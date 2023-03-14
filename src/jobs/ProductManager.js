'use strict';
const { readFileSync, writeFileSync } = require("fs");

class ProductManager {

  static idCounter = 0;

  constructor(path) {
    this.path = path;
    this.products = new Array();
  }

  addProduct(product) {
    this.products = JSON.parse(readFileSync(this.path, "utf-8"));
    let found = this.products.find((element) => element.code === product.code);
    if (found === undefined) {
      if (!this.products.length) {
        ProductManager.idCounter = 1;
      } else {
        ProductManager.idCounter =
          this.products[this.products.length - 1].id + 1;
      }

      const newProduct = {
        id: ProductManager.idCounter,
        ...product,
      };

      this.products.push(newProduct);
      writeFileSync(this.path, JSON.stringify(this.products, null, 2));
      console.log("Product created successfully!");
    } else {
      console.log("Product already exists");
    }
  }

  getProducts(limit) {
    this.products = JSON.parse(readFileSync(this.path, "utf-8"));
    if (!this.products.length) {
      return "Products list is empty";
    } else {
      return this.products.slice(0, limit);
    }
  }

  getProductById(id) {
    this.products = JSON.parse(readFileSync(this.path, "utf-8"));
    const found = this.products.find((element) => element.id === Number(id));
    if (found) {
      return found;
    } else {
      return "Product not found";
    }
  }

  updateProduct(product) {
    this.products = JSON.parse(readFileSync(this.path, "utf-8"));
    const found = this.products.find((p) => p.id === Number(product.id));
    if (found !== undefined) {
      this.products.map((p) => {
        if (p.id === Number(product.id)) {
          p.title = product.title;
          p.description = product.description;
          p.code = product.code;
          p.price = product.price;
          p.status = product.status;
          p.stock = product.stock;
          p.category = product.category;
          p.thumbnails = product.thumbnails;
          console.log("this.products: ", this.products);
          writeFileSync(this.path, JSON.stringify(this.products, null, 2));
        }
      });
      return "Product updated successfully!";
    } else {
      return "Product not found!";
    }
  }

  deleteProduct(id) {
    this.products = JSON.parse(readFileSync(this.path, "utf-8"));
    const found = this.products.find((product) => product.id === Number(id));
    if (found !== undefined) {
      this.products = this.products.filter(
        (product) => product.id !== Number(id)
      );
      writeFileSync(this.path, JSON.stringify(this.products, null, 2));
      return "Product deleted successfully!";
    } else {
      return "Product not found";
    }
  }

  // end class
}

module.exports = ProductManager;
