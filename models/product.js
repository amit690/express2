const db= require('../util/database');


module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id=id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    if (!this.id) {
      // Insert a new product
      return db.execute(
        'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
        [this.title, this.price, this.imageUrl, this.description]
      );
    } else {
      // Update existing product logic (if necessary)
      return db.execute(
        'UPDATE products SET title = ?, price = ?, imageUrl = ?, description = ? WHERE id = ?',
        [this.title, this.price, this.imageUrl, this.description, this.id]
      );
    }
  }
  

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static getproductById(id) {
    return db.execute(`SELECT * FROM products WHERE id= ?`, [id]);
  }

  static deletProduct(id){
    return db.execute('DELETE FROM products where id = ?', [id]);
  }
};
