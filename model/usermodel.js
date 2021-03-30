var userEntity = require('./../entity/user');
var getUserDetail = function getUserDetail(data, cb){
    userEntity.getUserDetail(data, function(result){    
        if(result.status){
            var userIds = [];
            for(var i=0; i<result.data.length; i++){
                userIds.push(result.data[0].id);
            }
            userEntity.userRoleList(userIds, function(userRoleList){
                if(userRoleList.status){
                    result.userRoleList = userRoleList.data;
                }
                cb(result);
            });
        }else{
            cb(result);
        }
    });
}
module.exports.saveNewUser = function(data, cb){
    userEntity.saveNewUser(data, function(result){
        cb(result);
    });
}
module.exports.addCompanyUsers = function(data, cb){
    userEntity.addCompanyUsers(data, function(result){
        cb(result);
    });
}
module.exports.updateUserDetail = function(data, cb){
    userEntity.updateUserDetail(data, function(result){
        cb(result);
    });    
}
module.exports.deleteUser = function(data, cb){
    userEntity.deleteUser(data, function(result){
        cb(result);
    });    
}

function multipleParrallelCall(index, cb){
    call++;
    return (function(){
        return function(){
            call--;
            if(call==0){
                cb(result)
            }
        }
    })(index);
}
module.exports.getUserDetail = getUserDetail;