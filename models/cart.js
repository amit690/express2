const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct_toCart(id, price) {
    // Read the cart file
    fs.readFile(p, 'utf8', (err, data) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        try {
          cart = JSON.parse(data);
        } catch (parseErr) {
          console.error('Error parsing the cart data:', parseErr);
        }
      }

      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(p => p.id === id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      // Add new product or increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qun = updatedProduct.qun + 1;
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qun: 1 };
        cart.products.push(updatedProduct);
      }

      cart.totalPrice = cart.totalPrice + +price;

      // Write the updated cart back to the file
      fs.writeFile(p, JSON.stringify(cart), err => {
        if (err) {
          console.error('Error writing to cart file:', err);
        }
      });
    });
  }
};
