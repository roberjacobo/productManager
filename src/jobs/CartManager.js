const fs = require("fs");

class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = new Array();
    this._idCounter = JSON.parse(fs.readFileSync(path, "utf-8")).length;
  }

  addCart(cart) {
    this.carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    const found = this.carts.find((element) => element.code === cart.code);

    if (found === undefined) {
      if (!this.carts.length) {
        CartManager.idCounter = 1;
      } else {
        CartManager.idCounter = this.carts[this.carts.length - 1].id++;
      }

      const newCart = {
        id: CartManager.idCounter,
        ...cart,
      };

      this.carts.push(newCart);
      fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2));
      return "Cart Added Succesfully";
    } else {
      return "Cart already exists";
    }
  }

  getCarts(limit) {
    this.carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    if (!this.carts.length) {
      return "Carts list is empty";
    } else {
      return this.carts.slice(0, limit);
    }
  }

  getCartById(id) {
    this.carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    const found = this.carts.find((element) => element.id === Number(id));
    if (found) {
      return found;
    } else {
      return "Cart not found";
    }
  }

  addCartWithProduct(cart) {
    console.log(cart);
    this.carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    const cartFound = this.carts.find((element) => element.id === cart.id);

    if (cartFound === undefined) {
      !this.carts.length
        ? (CartManager.idCounter = 1)
        : (CartManager.idCounter = this.carts[this.carts.length - 1].id + 1);

      const newCart = {
        id: CartManager.idCounter,
        products: new Array(cart.product),
      };

      this.carts.push(newCart);
      fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2));
    } else {
      const productFound = cartFound.products.find(
        (element) => element.id === cart.product.id
      );

      if (productFound !== undefined) {
        productFound.quantity = cart.product.quantity + productFound.quantity;
      } else {
        cartFound.products.push(cart.product);
      }

      fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2));
    }
  }

  // end class
}

module.exports = CartManager;
