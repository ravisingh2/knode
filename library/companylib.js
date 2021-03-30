var companyModel = require('./../model/companymodel');
module.exports.getCountryList = function(data, cb){
    companyModel.getCountryList(data, function(countryList){
        cb(countryList);
    });
};
module.exports.getStateList = function(data, cb){
    companyModel.getStateList(data, function(stateList){
        cb(stateList);
    });    
};
module.exports.priceSave = function(data, cb){
    companyModel.priceSave(data, function(stateList){
        cb(stateList);
    });
};
module.exports.addCompany = function(data, cb){
    companyModel.addCompany(data, function(stateList){
        cb(stateList);
    });
};
module.exports.updateCompany = function(data, cb){
    companyModel.updateCompany(data, function(result){
        cb(result);
    });
};
module.exports.getCompanyList = function(data, cb){
    companyModel.getCompanyList(data, function(companyList){
        cb(companyList);
    });
};

module.exports.saveEmailTemplate = function(data, cb){
    companyModel.saveEmailTemplate(data, function(saveemail){
        cb(saveemail);
    });
};

module.exports.getTemplateList = function(data , cb){
    companyModel.getTemplateList(data , function(getTemplate){
        cb(getTemplate);
    });
}
module.exports.deleteEmailTemplate = function(data , cb){
    companyModel.deleteEmailTemplate(data , function(deleteTeplate){
        cb(deleteTeplate);
    });
};
module.exports.getEmailTeamplateName = function(data , cb){
    companyModel.getEmailTeamplateName(data , function(emailTeplateName){
        cb(emailTeplateName);
    });
};

module.exports.editEmailTemplate = function(data , cb){
    companyModel.editEmailTemplate(data , function(editEmailTemplate){
        cb(editEmailTemplate);
    });
};
    
module.exports.activateOrdeactivate = function(data, cb){
    var filter = {};
    filter.company_id = data.where.id;
    companyModel.getCompanyList(filter, function(companyDetail){
        console.log(companyDetail);
        if(companyDetail.data[0] != undefined && companyDetail.data[0].activation_code!=''){
            templateFilter = {};
            templateFilter.type = 'send_activation_link_to_admin';
            companyModel.editEmailTemplate(templateFilter , function(templateDetail){
                var templateData = {};
                templateData.company_name = companyDetail.data[0].company_name;
                templateData.activation_url = constant.var['activation_url']+urlencode(companyDetail.data[0].activation_code);
                if(templateDetail.data[0].body_msg!=undefined && templateDetail.data[0].body_msg!=''){
                    replaceKeyFromMsg(templateDetail.data[0].body_msg, templateData, function(msg){
                        var dataForMailQueue = {};
                        dataForMailQueue.subject = templateDetail.data[0].subject;
                        dataForMailQueue.message = msg;
                        dataForMailQueue.to = companyDetail.data[0].email;
                        dataForMailQueue.cc = templateDetail.data[0].cc_mail;
                        dataForMailQueue.mail_sent = 0;
                        companyModel.sendMailToQueue(dataForMailQueue, function(result){
                        });
                    });
                }                
            });
        }
        companyModel.activateOrdeactivate(data, function(result){
            
           cb(result); 
        });
    });
};

function replaceKeyFromMsg(msg, templateData, cb){
    for(var key in templateData){
        msg = msg.replace('{'+key+'}', templateData[key]);
    }
    cb(msg);
}
module.exports.getServicelist = function(parameters, cb){
    companyModel.getServicelist(parameters, function(serviceList){
        cb(serviceList);
    });
};
module.exports.addToCart = function(parameters, cb) {
    companyModel.addToCart(parameters, function(response){
        cb(response);
    });
}
module.exports.updateToCart = function(parameters, cb) {
    companyModel.updateToCart(parameters, function(response){
        cb(response);
    });
}
module.exports.checkServiceIntoCart = function(parameters, cb){
    companyModel.serviceIntoCart(parameters, function(result){
        cb(result);
    });
};
module.exports.deleteServiceFromCart = function(parameters, cb){
    companyModel.deleteServiceFromCart(parameters, function(response){
        cb(response);
    });
};
module.exports.applyCoupon = function(parameters, cb){
    companyModel.applyCoupon(parameters, function(response){
        cb(response);
    });
};
module.exports.getCouponList = function(parameters, cb){
    companyModel.getCouponList(parameters, function(response){
        cb(response);
    });
};
module.exports.cartlist = function(parameters, cb){
    companyModel.serviceIntoCart(parameters, function(result){
        cb(result);
    });
};
module.exports.getAppliedCoupon = function(parameters, cb){
    companyModel.getAppliedCoupon(parameters, function(result){
        cb(result);
    });
};