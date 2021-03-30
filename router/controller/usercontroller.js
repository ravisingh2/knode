var userlib = require('../../library/userlib');
var loginuser = function loginuser(req, res){
    var parameters = {};
    var error = {};
    error.status = false;
    var parameters = {};
    if(req.query.username == undefined || parameters.username ==''){
        error.status = true;
        error.msg = 'username is requires';
    }else {
        parameters.username = req.query.username;
    }
    if(req.query.password == undefined || parameters.password ==''){
        error.status = true;
        error.msg = 'password is requires';        
    }else{
        parameters.password = req.query.password;
    }
    if(error.status == false){
        userlib.getUserDetail(parameters, function(result){
            sendResponse(result, res);
        });    
    } else{
        sendResponse(error, res);
    }
}
module.exports.getUserDetails = function getUserDetails(req, res){
    var parameters = {};
    var error = {};
    error.status = false;
    var parameters = {};
    if(req.query.company_id == undefined || parameters.company_id ==''){
        error.status = true;
        error.msg = 'Company id is requires';
    }else {
        parameters.company_id = req.query.company_id;
    }
    if(req.query.id != undefined && parameters.id !=''){
        parameters.id = req.query.id;       
    }
    if(error.status == false){
        userlib.getUserDetail(parameters, function(result){
            sendResponse(result, res);
        });    
    } else{
        sendResponse(error, res);
    }
}
module.exports.deleteUser = function deleteUser(req, res){
    var parameters = {};
    var error = {};
    error.status = false;
    var parameters = {};
    if(req.query.id == undefined || parameters.id ==''){
        error.status = true;
        error.msg = 'User id is required';
    }else {
        parameters.id = req.query.id;
    }
    
    if(error.status == false){
        userlib.deleteUser(parameters, function(result){
            sendResponse(result, res);
        });    
    } else{
        sendResponse(error, res);
    }
}
function sendResponse($data, res){
    res.send($data);
}
module.exports.loginuser = loginuser;
