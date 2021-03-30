var getUserDetail = function(data, cb){
    var dbo = global.db.getDbo();
    var usercollection = dbo.collection('users');
    usercollection.find(data).toArray(function(err, userDetails){
      cb(userDetails);  
    });
    //cb(userDetail);
}
module.exports.saveNewUser = function(data, cb){
    var dbo = global.db.getDbo();
    var usercollection = dbo.collection('users');
    usercollection.insert(data, function(err, data){
        var result = {};
        result.status = true;
        if(err) {
            result.status = false;
            cb(result);
        }else{
            result.data = data;
            cb(result);
        }
    });
    
}
module.exports.getUserDetail = getUserDetail;