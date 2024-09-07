const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([products, metadata])=>{
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {console.log('db in getproduct err',err)})
};

exports.getProduct = (req, res, next) =>{
  const prodId=req.params.productId;
  Product.getproductById(prodId)
    .then(([[product]])=> {
      res.render('shop/product-detail', {product: product , pageTitle: product.title, path: '/products'})
    })
    .catch(err => console.log(err));
  
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([products,metadata])=>{
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err =>{console.log('db err',err)})
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.postCart = (req, res, next) =>{
  const prodId=req.body.productId;
  Product.getproduct((prodId), (product)=>{
    Cart.addProduct_toCart(prodId, product.price);
  });
  res.redirect('/');
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
