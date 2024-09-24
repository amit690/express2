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
  req.user.createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  })
    .then(()=> {
      console.log('product created succesfully');
      res.redirect('/'); 
    })
    .catch(err => console.log(err));
};

exports.geteditProduct = (req, res, next) => {
  const editMode= req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  const prodId= req.params.productId;
  req.user.getProducts({where: {id: prodId}})
  //Product.findByPk(prodId)
    .then((products) => {
      console.log(editMode);
      
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: products[0]
      });
    })
    .catch((err)=> {
      console.log(err);
      
      return res.redirect('/');
    })

};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;

  Product.findByPk(prodId) // Find the product by ID
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      // Update product properties
      product.title = updatedTitle;
      product.imageUrl = updatedImageUrl;
      product.price = updatedPrice;
      product.description = updatedDescription;

      // Save the updated product
      return product.save();
    })
    .then(result => {
      console.log('Product updated successfully!');
      res.redirect('/admin/products'); // Redirect after update
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct= (req,res,next)=>{
  const prodId=req.body.productId;
  Product.findByPk(prodId)
    .then((product)=>
      {
        return product.destroy()
      })
        .then(result => {
          console.log('destroy sucessful');
          res.redirect('/admin/products');
        })
    .catch(err => console.log(err));
}

exports.getProducts = (req, res, next) => {
  req.user.getProducts()
  //Product.findAll()
    .then((products)=>{
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => {console.log('admin get product err',err)})
};
