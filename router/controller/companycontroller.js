var companylib = require('../../library/companylib');
var userlib = require('../../library/userlib');
var cryptoJs = require('crypto-js');
module.exports.undefined = function(){
    var error = {};
    error.status = false;
    error.msg = 'company name not supplied';
    sendResponse(error, res);
}
module.exports.getcountrylist = function(req, res){
    var parameters = {};
    var error = {};
    error.status = false;
    if(req.query.country_id!=undefined && req.query.country_id!=''){
        parameters.country_id = req.query.country_id;
    }
    if(error.status == false){
        companylib.getCountryList(parameters, function(result){
            sendResponse(result, res);
        });    
    } else{
        sendResponse(error, res);
    }
}
module.exports.getstatelist = function(req, res){
    var parameters = {};
    var error = {};
    error.status = false;
    if(req.query.country_id!=undefined && req.query.country_id!=''){
        parameters.country_id = req.query.country_id;
    }else if(req.query.state_id!=undefined && req.query.state_id!=''){
        parameters.state_id = req.query.state_id;
    }
    if(error.status == false){
        companylib.getStateList(parameters, function(result){
            sendResponse(result, res);
        });    
    } else{
        error.status = false;
        sendResponse(error, res);
    }
}
function sendResponse($data, res){
    res.send($data);
}
module.exports.addcompany = function(req, res){
    var parameters = {};
    parameters.company = {};
    parameters.userDetail = {};
    var error = {};
    error.status = false;
    req.query.parameters = JSON.parse(req.query.parameters);
    if(req.query.parameters.company_name!=undefined && req.query.parameters.company_name!=''){
        parameters.userDetail.first_name = req.query.parameters.company_name;
    }else{
        error.status = true;
        error.msg = 'Merchant name not supplied';
    }
    if(req.query.parameters.ic_number!=undefined && req.query.parameters.ic_number!=''){
        parameters.userDetail.ic_number = req.query.parameters.ic_number;
    }else{
        error.status = true;
        error.msg = 'Ic number is not supplied';            
    }
    if(req.query.parameters.address!=undefined && req.query.parameters.address!=''){
        parameters.userDetail.address = req.query.parameters.address;
    }else{
        error.status = true;
        error.msg = 'address can not be empty';            
    }     
    if(req.query.parameters.email!=undefined && req.query.parameters.email!=''){
        parameters.userDetail.email = req.query.parameters.email;
        parameters.userDetail.username = req.query.parameters.email;
    }else{
        error.status = true;
        error.msg = 'email can not be empty';            
    }
    if(req.query.parameters.phone_number!=undefined && req.query.parameters.phone_number!=''){
        parameters.userDetail.phone_number = req.query.parameters.phone_number;
    }else{
        error.status = true;
        error.msg = 'phone number can not be empty';            
    }
    if(req.query.parameters.bank_name!=undefined && req.query.parameters.bank_name!=''){
        parameters.userDetail.bank_name = req.query.parameters.bank_name;
    }else{
        error.status = true;
        error.msg = 'Bank Name can not be empty';            
    }
    if(req.query.parameters.bank_account_number!=undefined && req.query.parameters.bank_account_number!=''){
        parameters.userDetail.bank_account_number = req.query.parameters.bank_account_number;
    }else{
        error.status = true;
        error.msg = 'Bank Account Number can not be empty';            
    }
    if(req.query.parameters.password!=undefined && req.query.parameters.password!=''){
        parameters.userDetail.password = req.query.parameters.password;
    }else{
        error.status = true;
        error.msg = 'Password can not be empty';            
    }    
    if(req.query.parameters.confirm_password!=undefined && req.query.parameters.confirm_password!='' && req.query.parameters.confirm_password == req.query.parameters.password){
        //parameters.userDetail.password = req.query.parameters.password;
    }else{
        error.status = true;
        error.msg = 'Confirm Password Does not match with password';            
    }    
    if(error.status == false){
        companylib.addCompany(parameters, function(result){
            sendResponse(result, res);
        });   
    }else{
        error.status = false;
        sendResponse(error, res);
    }    
}
module.exports.updatecompany = function(req, res){
    var parameters = {};
    var error = {};
    error.status = false;
    req.query.parameters = JSON.parse(req.query.parameters);
    if(req.query.parameters.company!=undefined){
        parameters = {};
        parameters.activation_code = req.query.parameters.company.activation_code;
        companylib.getCompanyList(parameters, function(companyDetail){  
            parameters.companyData = {};
            parameters.companyData.fields_to_update = {};
            parameters.companyData.where = {};
            parameters.companyData.fields_to_update.activation_code = '';
            parameters.companyData.fields_to_update.status = 1;
            parameters.companyData.where.activation_code = req.query.parameters.company.activation_code;        
            companylib.updateCompany(parameters.companyData, function(result){
                if(req.query.parameters.user!=undefined){
                    parameters.userData = {};
                    parameters.userData.fields_to_update = {};
                    parameters.userData.where = {};
                    parameters.userData.fields_to_update.first_name = req.query.parameters.user.first_name;
                    parameters.userData.fields_to_update.password = req.query.parameters.user.password;
                    parameters.userData.where.email = companyDetail['data'][0]['email'];
                    userlib.updateUserDetail(parameters.userData, function(){});
                } 
                sendResponse(result,res);
             });
        });        
    } else{
        error.msg = 'something goes wrong'; 
        sendResponse(error,res);
    }        
};

module.exports.getcompanylist = function(req, res){
    var parameters = {};
    var error = {};
    error.status = false;
    if(req.query.company_id!=undefined && req.query.company_id>0){
        parameters.company_id = req.query.company_id;
    }
    if(req.query.email!=undefined && req.query.email!=''){
        parameters.email = req.query.email;
    }    
    if(req.query.status!=undefined && req.query.status!=''){
        parameters.status = req.query.status;
    }    
    if(req.query.activation_code!=undefined && req.query.activation_code!=''){
        parameters.activation_code = req.query.activation_code;
    }    
    if(error.status == false){
        companylib.getCompanyList(parameters, function(result){
            sendResponse(result,res);
        });
    }
    else{
        sendResponse(result,res);
    }
} 

module.exports.saveemailtemplate = function(req, res){
    var parameters = {};
    parameters.emailDetails = {};
    var error = {};
    error.status = false;
    req.query.parameters = req.query;
    if(req.query.parameters.type!=undefined && req.query.parameters.type!=''){
        parameters.emailDetails.type = req.query.parameters.type;
    }else{
        error.status = true;
        error.msg = 'Email type not supplied';
    }
    if(req.query.parameters.company_id!=undefined && req.query.parameters.company_id!=''){
        parameters.emailDetails.company_id = req.query.parameters.company_id;
    }else{
        error.status = true;
        error.msg = 'Company Id not supplied';
    }
    if(req.query.parameters.role_id!=undefined && req.query.parameters.role_id!=''){
        parameters.emailDetails.role_id = req.query.parameters.role_id;
    }else{
        error.status = true;
        error.msg = 'Role Id not supplied';
    }
    
    if(req.query.parameters.nick_name!=undefined && req.query.parameters.nick_name!=''){
        parameters.emailDetails.nick_name = req.query.parameters.nick_name;
    }else{
        error.status = true;
        error.msg = 'nick name is not supplied';            
    }
    if(req.query.parameters.subject!=undefined && req.query.parameters.subject!=''){
        parameters.emailDetails.subject = req.query.parameters.subject;
    }else{
        error.status = true;
        error.msg = 'subject is not supplied';            
    }
    parameters.emailDetails.cc_mail = req.query.parameters.cc_mail;
    parameters.emailDetails.bcc_mail = req.query.parameters.bcc_mail;
    parameters.emailDetails.body_msg = req.query.parameters.body_msg;
    if(error.status == false){
        companylib.saveEmailTemplate(parameters, function(result){
            sendResponse(result, res);
        });   
    }else{
        error.status = false;
        sendResponse(error, res);
    }
}

module.exports.gettemplatelist = function(req, res){
    var parameters = {};
    var error = {};
    error.status = false;
    if(req.query.country_id!=undefined && req.query.country_id!=''){
        parameters.country_id = req.query.country_id;
    }
    if(error.status == false){
        companylib.getTemplateList(parameters, function(result){
            sendResponse(result, res);
        });    
    } else{
        sendResponse(error, res);
    }
}

module.exports.deleteEmailTemplate = function(req, res){
    var parameters = {};
    var error = {};
    error.status = false;
    if(req.query.id!=undefined && req.query.id!=''){
        parameters.id = req.query.id;
    }
    if(error.status == false){
        companylib.deleteEmailTemplate(parameters, function(result){
            sendResponse(result, res);
        });    
    } else{
        sendResponse(error, res);
    }
}
module.exports.editEmailTemplate = function(req, res){
    var parameters = {};
    var error = {};
    error.status = false;
    if(req.query.id!=undefined && req.query.id!=''){
        parameters.id = req.query.id;
    }
    if(error.status == false){
        companylib.editEmailTemplate(parameters, function(result){

            sendResponse(result, res);
        });    
    } else{
        sendResponse(error, res);
    }
}
    
module.exports.getstatelist = function(req, res){
    var parameters = {};
    var error = {};
    error.status = false;
    if(req.query.country_id!=undefined && req.query.country_id!=''){
        parameters.country_id = req.query.country_id;
    }else if(req.query.state_id!=undefined && req.query.state_id!=''){
        parameters.state_id = req.query.state_id;
    }
    if(error.status == false){
        companylib.getStateList(parameters, function(result){
            sendResponse(result, res);
        });    
    } else{
        error.status = false;
        sendResponse(error, res);
    }
}
module.exports.activateordeactivatecompany = function(req, res){
    var parameters = {};
    var error = {};
    parameters.fields_to_update={};
    parameters.where = {};
    error.status = false;
    if(req.query.company_id!=undefined && req.query.company_id>0){
        parameters.where.id = req.query.company_id;
    }else{
        error.msg = 'company id not is not supplied'; 
    }
    if(req.query.status!=undefined && req.query.status!=''){
        parameters.fields_to_update.status = req.query.status;
    }else{
        error.msg = 'status not is not supplied'; 
    }    
    if(req.query.activated_by!=undefined && req.query.activated_by>0){
        parameters.fields_to_update.activated_by = req.query.activated_by;
    }else{
        error.msg = 'user id not is not supplied'; 
    }    
    if(error.status == false){
        companylib.activateOrdeactivate(parameters, function(result){
            sendResponse(result, res);
        });    
    } else{
        sendResponse(error, res);
    }
}
module.exports.getServicelist = function(req, res){
    var parameters = {};
    var error = {};
    error.status = false;

    if(error.status == false){
        companylib.getServicelist(parameters, function(result){
            sendResponse(result, res);
        });    
    } else{
        sendResponse(error, res);
    }
}
module.exports.addToCart = function(req, res){
    var parameters = {};
    var error = {};
    error.status = false;
    parameters.serviceToAddIntoCart = {};
    parameters.where = {};
    var serviceParams = {};
    if(req.query.company_id!=undefined && req.query.company_id>0){
        parameters.where.company_id = parameters.serviceToAddIntoCart.company_id = req.query.company_id;
    }else{
        error.status = true;
        error.msg = 'company id not supplied';
    }
    if(req.query.user_id!=undefined && req.query.user_id>0){
        parameters.serviceToAddIntoCart.user_id = req.query.user_id;
    }else{
        error.status = true;
        error.msg = 'user id is not supplied';            
    }
    if(req.query.service_id!=undefined && req.query.service_id>0){
        parameters.where.service_id = parameters.serviceToAddIntoCart.service_id = req.query.service_id;
        serviceParams.service_id = req.query.service_id;
    }else{
        error.status = true;
        error.msg = 'service id is not supplied';            
    }
    if(req.query.service_detail_id != undefined && req.query.service_detail_id>0){
        parameters.serviceToAddIntoCart.service_detail_id = req.query.service_detail_id;
        serviceParams.service_detail_id = req.query.service_detail_id;
    }else{
        error.status = true;
        error.msg = 'service id is not supplied';            
    }
    if(error.status == false){
        companylib.checkServiceIntoCart(parameters, function(serviceIntoCart){     
            if(serviceIntoCart.status==false || (serviceIntoCart.data[0].service_detail_id != parameters.serviceToAddIntoCart.service_detail_id)){
                companylib.getServicelist(serviceParams, function(serviceList){
                    if(serviceList.status==true){
                        if(serviceIntoCart.status==true) {
                            parameters.fields_to_update = {};
                            parameters.where = {};
                            parameters.fields_to_update.service_detail_id = parameters.serviceToAddIntoCart.service_detail_id;
                            parameters.where.service_id = parameters.serviceToAddIntoCart.service_id;
                            parameters.where.company_id = parameters.serviceToAddIntoCart.company_id;
                            companylib.updateToCart(parameters, function(result){
                                sendResponse(result, res);
                            });                            
                        }else{
                            companylib.addToCart(parameters.serviceToAddIntoCart, function(result){
                                sendResponse(result, res);
                            });
                        }
                    }else{
                        error.status = true;
                        error.msg = 'Invalid argument supplied in add to cart';
                        sendResponse(error, res);
                    }
                });
            }else{
                error.status = true;
                error.msg = 'Service Already added to cart';
                sendResponse(error, res);                
            }
        });
    } else{
        sendResponse(error, res);
    }
}
module.exports.deleteServiceFromCart = function(req, res) {
    var parameters = {};
    var error = {};
    error.status = false;
    parameters.where = {};
    if(req.query.company_id!=undefined && req.query.company_id>0){
        parameters.where.company_id = req.query.company_id;
    }else{
        error.status = true;
        error.msg = 'company id not supplied';
    }    
    if(req.query.service_id!=undefined && req.query.service_id>0){
        parameters.where.service_id = req.query.service_id;
    }else{
        error.status = true;
        error.msg = 'service id is not supplied';            
    }
    if(req.query.service_detail_id != undefined && req.query.service_detail_id>0){
        parameters.where.service_detail_id = req.query.service_detail_id;
    }else{
        error.status = true;
        error.msg = 'service id is not supplied';            
    }
    if(error.status == false){       
        companylib.deleteServiceFromCart(parameters, function(response){
            sendResponse(response, res);
        });
    }else{
        sendResponse(error, res);
    }
}
module.exports.applyCoupon = function (req, res){
    var parameters = {};
    var error = {};
    error.status = false;
    parameters.where = {};
    if(req.query.company_id!=undefined && req.query.company_id>0){
        parameters.where.company_id = req.query.company_id;
    }else{
        error.status = true;
        error.msg = 'company id not supplied';
    }    
    if(req.query.coupon_code!=undefined){
        parameters.where.coupon_code = req.query.coupon_code;
    }else{
        error.status = true;
        error.msg = 'coupon code not supplied';
    }
    if(error.status == false){       
        parameters.servcieDetails = true;
        companylib.getCouponList(parameters, function(response){   
            if(response.status==true){
                var addCoupon ={};
                addCoupon.fieldToAdd = {};
                addCoupon.where = {};
                addCoupon.fieldToAdd.coupon_id = response.data.id;
                addCoupon.fieldToAdd.company_id = req.query.company_id;
                addCoupon.where.company_id = req.query.company_id;
                companylib.applyCoupon(addCoupon, function(response){
                    response.msg="coupon applied successfully";
                    sendResponse(response, res);
                });
            }else{
                error.status = false;
                error.msg = 'Invalid coupon code';
                sendResponse(error, res);
            }
        });     
    }else{
        error.status = false;
        sendResponse(error, res);
    }    
}
module.exports.cartlist = function (req, res){
    var parameters = {};
    parameters.where = {};
    var error = {};
    error.status = false;    
    if(req.query.company_id!=undefined && req.query.company_id>0){
        parameters.where.company_id = req.query.company_id;
    }else{
        error.status = true;
        error.msg = 'company id not supplied';
    }  
    parameters.service_details = true;
    if(req.query.user_id==undefined || req.query.user_id==0 || req.query.user_id==''){
        error.status = true;
        error.msg = 'user id is not supplied';       
    }    
    if(error.status == false){
        companylib.cartlist(parameters, function(result){
            if(result.status==false){
                result.msg="No data found"
                sendResponse(result, res);
            }else{
                var appliedCouponDetail = {};
                companylib.getAppliedCoupon(parameters, function(couponDetail){
                    result['applied_coupon'] = couponDetail;
                    sendResponse(result, res);
                });
            }
        });    
    } else{
        sendResponse(error, res);
    }    
}
