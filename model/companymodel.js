var companyEntity = require('./../entity/company');
module.exports.getCountryList = function getCountryList(data, cb){
    companyEntity.getCountryList(data, function(result){
        cb(result);
    });
};
module.exports.getStateList = function getStateList(data, cb){
    companyEntity.getStateList(data, function(result){
        cb(result);
    });
};
module.exports.priceSave = function priceSave(data, cb){
    companyEntity.priceSave(data, function(result){
        cb(result);
    });
};
module.exports.addCompany = function addCompany(data, cb){
    companyEntity.addCompany(data, function(result){
        cb(result);
    });
};
module.exports.getCompanyList = function getCompanyList(data, cb){
    companyEntity.getCompanyList(data, function(result){
      cb(result);
    });
};

module.exports.editEmailTemplate = function editEmailTemplate(data , cb){
    companyEntity.editEmailTemplate(data, function(result){
        cb(result);
    });
};
module.exports.saveEmailTemplate = function saveEmailTemplate(data, cb){
    companyEntity.saveEmailTemplate(data, function(result){
        cb(result);
    });
};

module.exports.getTemplateList = function getTemplateList(data , cb){
    companyEntity.getTemplateList(data, function(result){
        cb(result);
    });
};
module.exports.getEmailTeamplateName = function getEmailTeamplateName(data , cb){
    companyEntity.getEmailTeamplateName(data, function(result){
        cb(result);
    });
};

module.exports.deleteEmailTemplate = function deleteEmailTemplate(data , cb){
    companyEntity.deleteEmailTemplate(data, function(result){
        cb(result);
    });
};    

module.exports.editEmailTemplate = function editEmailTemplate(data , cb){
    companyEntity.editEmailTemplate(data, function(result){
        cb(result);
    });
};
module.exports.getCountryList = function getCountryList(data, cb){
    companyEntity.getCountryList(data, function(result){
        cb(result);
    });
};
module.exports.getStateList = function getStateList(data, cb){
    companyEntity.getStateList(data, function(result){
        cb(result);
    });
};
module.exports.priceSave = function priceSave(data, cb){
    companyEntity.priceSave(data, function(result){
        cb(result);
    });
};
module.exports.addCompany = function addCompany(data, cb){
    companyEntity.addCompany(data, function(result){
        cb(result);
    });
};
module.exports.saveEmailTemplate = function saveEmailTemplate(data, cb){
    companyEntity.saveEmailTemplate(data, function(result){
        cb(result);
    });
};

module.exports.getTemplateList = function(data , cb){
    companyEntity.getTemplateList(data, function(result){
        cb(result);
    });
};

module.exports.deleteEmailTemplate = function(data , cb){
    companyEntity.deleteEmailTemplate(data, function(result){
        cb(result);
    });
};

module.exports.activateOrdeactivate = function(data , cb){
    companyEntity.updateCompany(data, function(result){
        
        cb(result);
    });
};
module.exports.updateCompany = function(data, cb){
    companyEntity.updateCompany(data, function(result){        
        cb(result);
    });    
}
module.exports.sendMailToQueue = function(dataForMailQueue){
    companyEntity.sendMailToQueue(dataForMailQueue);
};
module.exports.getServicelist = function(parameters, cb){
    companyEntity.getServicelist(parameters, function(serviceList){
        cb(serviceList);
    });
};
module.exports.addToCart = function(parameters, cb){
    companyEntity.addToCart(parameters, function(response){
        cb(response);
    });
}
module.exports.updateToCart = function(parameters, cb){
    companyEntity.updateToCart(parameters, function(response){
        cb(response);
    });
}
module.exports.serviceIntoCart = function(parameters, cb){
    companyEntity.serviceIntoCart(parameters, function(result){        
        cb(result);
    });
}
module.exports.deleteServiceFromCart = function(parameters, cb){
    companyEntity.deleteServiceFromCart(parameters, function(response){        
        cb(response);
    });
}
module.exports.applyCoupon = function(parameters, cb){
    companyEntity.applyCoupon(parameters, function(response){
        cb(response);
    });
};
module.exports.getCouponList = function(parameters, cb){
    companyEntity.getCouponList(parameters, function(response){
        cb(response);
    });
};
module.exports.getAppliedCoupon = function(parameters, cb){
    companyEntity.getAppliedCoupon(parameters, function(response){
        cb(response);
    });
};