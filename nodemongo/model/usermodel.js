var userEntity = require('./../entity/user');
var getUserDetail = function getUserDetail(condition, cb){
    userEntity.getUserDetail(condition, function(result){
        cb(result);
    });
}
module.exports.saveNewUser = function(data, cb){
    userEntity.saveNewUser(data, function(result){
        cb(result);
    });
}
module.exports.getUserDetail = getUserDetail;