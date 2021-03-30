var productModel = require('./../model/productmodel');
module.exports.getProducts = function(filters, sortby, cb){
    productModel.getProductDetail(filters, sortby, function(productDetails){
        cb(productDetails);
    });
};