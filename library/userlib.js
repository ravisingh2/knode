var userModel = require('./../model/usermodel');
module.exports.getUserDetail = function(data, cb){
    userModel.getUserDetail(data, function(userDetails){
        cb(userDetails);
    });
};
module.exports.updateUserDetail = function(data, cb){
    userModel.updateUserDetail(data , function(result){
        cb(result);
    });    
};

module.exports.deleteUser = function(data, cb){
    userModel.deleteUser(data , function(result){
        cb(result);
    });    
};