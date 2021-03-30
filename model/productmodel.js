var productEntity = require('./../entity/product');
var getProductDetail = function getProductDetail(filters, sortby, cb){
    productEntity.getProductDetail(filters, sortby, function(result){
        cb(result);
    });
}
module.exports.getProductDetail = getProductDetail;