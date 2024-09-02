const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id=id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
   
    getProductsFromFile(products => { 
      if(this.id){
        const existingproductIndex=products.findIndex(prod=> prod.id===this.id);
        const updatedproduct=[...products];
        updatedproduct[existingproductIndex]=this;
        fs.writeFile(p, JSON.stringify(updatedproduct), err => {
          console.log(err);
        });
      }else {
        this.id=Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
      
     
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static getproduct(id, callback) {
    getProductsFromFile((products)=>{
      const product=products.find((p)=> p.id===id);
      callback(product);
    })
  }

  static deletProduct(id){
    getProductsFromFile((product)=>{
      const index= product.findIndex(prod => prod.id===id);
      const updatedproduct=[...product];
      updatedproduct.splice(index, 1);
      fs.writeFile(p, JSON.stringify(updatedproduct), err => {
        console.log(err);
      });
    });
  }
};
