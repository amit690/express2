const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save()
    .then(()=> {res.redirect('/');})
    .catch(err => console.log(err));
};

exports.geteditProduct = (req, res, next) => {
  const editMode= req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  const prodId= req.params.productId;
  Product.getproductById(prodId)
    .then(([product]) => {
      console.log(editMode);
      
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product[0]
      });
    })
    .catch((err)=> {
      console.log(err);
      
      return res.redirect('/');
    })

};

exports.postEditProduct=(req,res,next)=>{
  const prodId=req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(prodId, title, imageUrl, description, price);

  product.save()
    .then(()=>
      {
        res.redirect('/admin/products');
      })
    .catch(err => console.log(err));
  
}

exports.postDeleteProduct= (req,res,next)=>{
  const prodId=req.body.productId;
  Product.deletProduct(prodId)
    .then(()=>
      {
        res.redirect('/admin/products');
      })
    .catch(err => console.log(err));
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([products, metadata])=>{
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => {console.log('admin get product err',err)})
};
