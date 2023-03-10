import { readFileSync, writeFileSync } from "fs";

class CartManager {
  static idCounter = 0;

  constructor(path) {
    this.path = path;
    this.carts = new Array();
  }

  static _idCounter = JSON.parse(
    readFileSync("./src/models/carts.json", "utf-8")
  ).length;

  addCart(cart) {
    this.carts = JSON.parse(readFileSync(this.path, "utf-8"));
    const found = this.carts.find((element) => element.code === cart.code);

    if (found === undefined) {
      if (!this.carts.length) {
        CartManager._idCounter = 1;
      } else {
        CartManager.idCounter = this.carts[this.carts.length - 1].id + 1;
      }

      const newCart = {
        id: CartManager._idCounter,
        ...cart,
      };

      this.carts.push(newCart);
      writeFileSync(this.path, JSON.stringify(this.carts, null, 2));
      return "Cart Added Succesfully";
    } else {
      return "Cart already exists";
    }
  }

  getCarts(limit) {
    this.carts = JSON.parse(readFileSync(this.path, "utf-8"));
    if (!this.carts.length) {
      return "Carts list is empty";
    } else {
      return this.carts.slice(0, limit);
    }
  }

  getCartById(id) {
    this.carts = JSON.parse(readFileSync(this.path, "utf-8"));
    const found = this.carts.find((element) => element.id === Number(id));
    if (found) {
      return found;
    } else {
      return "Cart not found";
    }
  }

  addCartWithProduct(cart) {
    console.log(cart);
    this.carts = JSON.parse(readFileSync(this.path, "utf-8"));
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
      writeFileSync(this.path, JSON.stringify(this.carts, null, 2));
    } else {
      const productFound = cartFound.products.find(
        (element) => element.id === cart.product.id
      );

      if (productFound !== undefined) {
        productFound.quantity = cart.product.quantity + productFound.quantity;
      } else {
        cartFound.products.push(cart.product);
      }

      writeFileSync(this.path, JSON.stringify(this.carts, null, 2));
    }
  }

  // end class
}

export default CartManager;
