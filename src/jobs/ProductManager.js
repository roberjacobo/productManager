const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = new Array();
  }

  static _idCounter =
    JSON.parse(fs.readFileSync(this.path, "utf-8")).length + 1;

  incrementId() {
    ProductManager._idCounter += 1;
  }

  addProduct(product) {
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    let found = this.products.find((element) => element.code === product.code);

    if (found === undefined) {
      this.incrementId();
      this.products.push({
        id: ProductManager._idCounter,
        ...product,
      });
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
      return "Product created successfully!";
    } else {
      return "Product already exists";
    }
  }

  getProducts(limit) {
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    if (!this.products.length) {
      return "Products list is empty";
    } else {
      return this.products.slice(0, limit);
    }
  }

  getProductById(id) {
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    const found = this.products.find((element) => element.id === Number(id));
    if (found) {
      return found;
    } else {
      return "Product not found";
    }
  }

  updateProduct(product) {
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
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
          fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
        }
      });
      return "Product updated successfully!";
    } else {
      return "Product not found!";
    }
  }

  deleteProduct(id) {
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    const found = this.products.find((product) => product.id === Number(id));
    if (found !== undefined) {
      this.products = this.products.filter(
        (product) => product.id !== Number(id)
      );
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
      return "Product deleted successfully!";
    } else {
      return "Product not found";
    }
  }

  // end class
}

module.exports = ProductManager;
