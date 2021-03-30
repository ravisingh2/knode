var getProductDetail = function(filters, sortby, cb){
    var dbo = global.db.getDbo();
    var productcollection = dbo.collection('product');
    productcollection.find(filters).sort(sortby).toArray(function(err, productDetails){
      cb(productDetails);  
    });
    //cb(userDetail);
}
module.exports.getProductDetail = getProductDetail;