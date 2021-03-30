var userModel = require('./../model/usermodel');
var saveUserData = function (data, cb){
    var condition = {"email":data.email};
    userModel.getUserDetail(condition, function(userDetails){
        if(userDetails.length==0){
            userModel.saveNewUser(data , function(result){
                cb(result);
            });
        }else{
            cb(userDetails);
        }
    });
};
module.exports.getUserDetail = function(data, cb){
    var condition = {"email":data.email, "password":data.password};
    userModel.getUserDetail(condition, function(userDetails){
        cb(userDetails);
    });
};
module.exports.saveUserData = saveUserData;