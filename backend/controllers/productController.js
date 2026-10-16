import asyncHandler from'../middleware/asyncHandler.js';
import Product from'../models/productModel.js';

//@desc fetch all the products
// @routes GET/api/products
// //@access Public
const getProducts =asyncHandler(async(req,res)=>{
     const products=await Product.find({});
    res.json(products);


});
//@desc fetch a product
// @routes GET/api/products/:id
// //@access Public

const getProductById =asyncHandler(async(req,res)=>{
      const product = await Product.findById(req.params.id);

      if(product){
    return res.json(product);
}
else{
    res.status(404);
    throw new Error('Resourse not found');

}
});
export {getProducts,getProductById};