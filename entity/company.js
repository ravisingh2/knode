var mysqlDb = require('../db/mysql');
var userEntity = require('./user');
module.exports.getCountryList = function(parameters, cb) {
    var query = '';
    var identifiers = 0;
    var queryData = [];
    query += 'select * from country_master';
    if(parameters.country_id !=undefined && parameters.country_id>0){
        query += ' Where id=?';
        queryData[identifiers] = parameters.country_id;
    }
    mysqlDb.dbQuery(query, queryData, function(result){
        var response = {};
        response.status = false;
        if(result.length){
            response.status = true;
            response.data = result;
            cb(response);
        }else{
            cb(response);
        }
    });
}

module.exports.getStateList = function(parameters, cb) {
    var query = '';
    var identifiers = 0;
    var queryData = [];
    var columns = ['state_master.id', 'state_master.state_name', 'state_master.state_short_name', 'country_master.id', 'country_master.country_name'];
    query += 'select ?? from state_master'
    query += ' LEFT JOIN country_master on state_master.country_id=country_master.id';
    queryData[identifiers++] = columns;
    if(parameters.state_id !=undefined && parameters.state_id>0){
        query +=' WHERE state_master.id=?';
        queryData[identifiers++] = parameters.state_id;
    }else if(parameters.country_id !=undefined && parameters.country_id>0){
        query +=' WHERE state_master.country_id=?';
        queryData[identifiers++] = parameters.country_id;
    }
    mysqlDb.dbQuery(query, queryData, function(result){
        var response = {};
        response.status = false;
        if(result.length){
            response.status = true;
            response.data = result;
            cb(response);
        }else{
            cb(response);
        }
    });
}
module.exports.priceSave = function(parameters, cb) {
    var query = '';
    var queryData = parameters;
    query += 'INSERT INTO service_price_master set ?';
    mysqlDb.dbQuery(query, queryData, function(result){
        var response = {};
        response.status = false;
        if(result.insertId){
            response.status = true;
            response.data = result;
            cb(response);
        }else{
            cb(response);
        }
    });
}

module.exports.getCompanyList = function(parameters, cb) {
    var query = '';
    var identifiers = 0;
    var queryData = [];
    var columns = ['company_master.id', 'company_master.company_name', 'company_master.company_url', 'company_master.address', 'company_master.zip_code','company_master.type', 'company_master.contact_via', 'company_master.time_to_contact', 'company_master.activation_code', 'company_master.status', 'user_master.email', 'user_master.phone_number', 'user_master.alt_phone_number', 'country_master.country_name', 'state_master.state_name'];
    query += 'select ?? from company_master ';
    queryData[identifiers++] = columns;
    query += 'LEFT JOIN user_master ON company_master.id=user_master.company_id ';
    query += 'LEFT JOIN country_master ON company_master.country_id=country_master.id ';
    query += 'LEFT JOIN state_master ON company_master.state_id=state_master.id ';
    if(parameters.company_id != undefined){
        query += ' Where company_master.id=?';
        queryData[identifiers++] = parameters.company_id;
    }        
    if(parameters.status != undefined){
        var clause = (identifiers>1)?' AND ':' WHERE ';
        query += clause+' company_master.status=?';
        queryData[identifiers++] = parameters.status;
    }
    if(parameters.activation_code != undefined){
        var clause = (identifiers>1)?' AND ':' WHERE ';
        query += clause+' company_master.activation_code=?';
        queryData[identifiers++] = parameters.activation_code;
    }
       mysqlDb.dbQuery(query, queryData, function(result){
        var response = {};
        response.status = false;
        if(result !=undefined && result.length){
            response.status = true;
            response.data = result;
            cb(response);
        }else{
            cb(response);
        }
    }); 
};

module.exports.deleteEmailTemplate = function(parameters , cb){
    var query = '';
    var identifiers = 0;
    var queryData = [];
    query += 'delete from email_template where id =?';
    queryData[identifiers] = parameters.id;
    mysqlDb.dbQuery(query, queryData, function(result){
            var response = {};
            response.status = true;
            cb(response);
    }); 
};
module.exports.editEmailTemplate = function(parameters , cb){
    var query = '';
    var identifiers = 0;
    var queryData = [];
    query += 'select * from email_template';
    if(parameters.id != undefined){
        query += ' Where email_template.id=?';
        queryData[identifiers] = parameters.id;
    }     
    if(parameters.type != undefined){
        query += ' Where email_template.type=?';
        queryData[identifiers] = parameters.type;
    }    
    mysqlDb.dbQuery(query, queryData, function(result){
            var response = {};
            response.status = true;
            if(result.length){
            response.status = true;
            response.data = result;
            cb(response);
            }else{
                cb(response);
            }
    }); 
};

module.exports.getTemplateList = function(parameters , cb){
    var query = '';
    var identifiers = 0;
    var queryData = [];
    query += 'select * from email_template';
    if(parameters.type !=undefined && parameters.type>0){
        query += ' Where type=?';
        queryData[identifiers] = parameters.type;
    }
    mysqlDb.dbQuery(query, queryData, function(result){
        var response = {};
        response.status = false;
        if(result.length){
            response.status = true;
            response.data = result;
            cb(response);
        }else{
            cb(response);
        }
    });
}
module.exports.getEmailTeamplateName = function(parameters , cb){
    var query = '';
    var identifiers = 0;
    var queryData = [];
    query += 'select * from email_template_name';
    if(parameters.role_id !=undefined && parameters.role_id>0){
        query += ' Where role_id=?';
        queryData[identifiers] = parameters.role_id;
    }
    mysqlDb.dbQuery(query, queryData, function(result){
        var response = {};
        response.status = false;
        if(result.length){
            response.status = true;
            response.data = result;
            cb(response);
        }else{
            cb(response);
        }
    });
}
module.exports.updateCompany = function(parameters , cb){
    var query = '';
    var queryData = [];
    var identifiers = 0;
    query = 'UPDATE company_master set ? ';
    queryData[identifiers++] = parameters.fields_to_update;
    query += ' Where ?';
    queryData[identifiers++] = parameters.where;
    mysqlDb.dbQuery(query, queryData, function(result){
        console.log(result);
        var response = {};
        response.status = false;
        if(result.affectedRows != undefined && result.affectedRows>0){
            response.status = true;
            response.msg = 'data updated successfully';
            cb(response);        
        }else{
            cb(response);
        }
    });
}
module.exports.addCompany = function(parameters, cb) {
    parameters.roleDetail = {};
    parameters.roleDetail.role_id = 2;
    userEntity.addCompanyUsers(parameters.userDetail, parameters.roleDetail, cb);
}

module.exports.saveEmailTemplate = function(parameters, cb) {
    var query = '';
    var identifiers = 0;
    var queryData = [];
    var queryDataForInsert = parameters.emailDetails;
    query += 'select * from email_template';
    if(parameters.emailDetails.company_id !=undefined ){
        query += ' Where company_id=?';
        queryData[identifiers] = parameters.emailDetails.company_id;
        query += 'AND type=?';
        identifiers++;
        queryData[identifiers] = parameters.emailDetails.type;
    }
    mysqlDb.dbQuery(query, queryData, function(result){
        if(result.length == 0){
            query = '';
            query += 'INSERT INTO email_template set ?';
            mysqlDb.dbQuery(query, queryDataForInsert, function(result){
                var response = {};
                response.status = false;
                if(result.insertId){
                    response.status = true;
                    response.msg = 'Added Succesfully';
                    cb(response);
                }else{
                    cb(response);
                }
            });
        }else{
            var response = {};
            response.status = false;
            response.msg = 'This Email All Ready Added .';
            cb(response);
        }
        });
}
module.exports.sendMailToQueue = function(dataForMailQueue){
    var query = '';
    var queryData = dataForMailQueue;
    query += 'INSERT INTO mail_queue_master set ?';
    mysqlDb.dbQuery(query, queryData, function(result){});    
};

module.exports.getServicelist = function(parameters, cb) {
    var query = '';
    var identifiers = 0;
    var queryData = [];
    query += 'select service_master.id as service_id, service_master.service_name,service_master.type, service_master.created_date, subscription_detail.id, subscription_detail.unit, subscription_detail.validity_days, subscription_detail.price from service_master INNER JOIN subscription_detail ON service_master.id=subscription_detail.service_id ';
    if(parameters.service_id!=undefined) {
        query += ' WHERE service_master.id=?';
        queryData[identifiers++] = parameters.service_id;
    }
    if(parameters.service_detail_id!=undefined) {
        query += ' AND subscription_detail.id=?';
        queryData[identifiers++] = parameters.service_detail_id;
    }    
    mysqlDb.dbQuery(query, queryData, function(result){
        var response = {};
        response.status = false;
        if(result.length){
            response.status = true;
            response.data = result;
            cb(response);
        }else{
            cb(response);
        }
    });
}
module.exports.addToCart = function(parameters, cb){
    var query = '';
    var queryData = parameters;
    query += 'INSERT INTO cart_master set ?';
    mysqlDb.dbQuery(query, queryData, function(result){
        var response = {};
        response.status = false;
        if(result.insertId){
            response.status = true;
            response.data = result;
            cb(response);
        }else{
            cb(response);
        }
    });    
}
module.exports.updateToCart = function(parameters, cb){
    var query = '';
    var queryData = [];
    var identifiers = 0;
    query = 'UPDATE cart_master set ? ';
    queryData[identifiers++] = parameters.fields_to_update;
    query += ' Where company_id=?';
    queryData[identifiers++] = parameters.where.company_id;
    query += ' AND service_id=?';
    queryData[identifiers++] = parameters.where.service_id;    
    mysqlDb.dbQuery(query, queryData, function(result){
        console.log(result);
        var response = {};
        response.status = false;
        if(result.affectedRows != undefined && result.affectedRows>0){
            response.status = true;
            response.msg = 'data updated successfully';
            cb(response);        
        }else{
            response.msg = 'Nothing to update';
            cb(response);
        }
    });    
}
module.exports.deleteServiceFromCart = function(parameters, cb){
    var query = '';
    var queryData = [];
    var identifiers = 0;
    query = 'DELETE FROM cart_master ';
    query += ' Where company_id=?';
    queryData[identifiers++] = parameters.where.company_id;
    if(parameters.where.service_id!=undefined){
        query += ' AND service_id=?';
        queryData[identifiers++] = parameters.where.service_id;    
    }
    if(parameters.where.service_detail_id!=undefined){
        query += ' AND service_detail_id=?';
        queryData[identifiers++] = parameters.where.service_detail_id;    
    }    
    mysqlDb.dbQuery(query, queryData, function(result){
        console.log(result);
        var response = {};
        response.status = false;
        if(result.affectedRows != undefined && result.affectedRows>0){
            response.status = true;
            response.msg = 'data deleted successfully';
            cb(response);        
        }else{
            response.msg = 'Nothing to delete';
            cb(response);
        }
    });    
}
module.exports.serviceIntoCart = function(parameters, cb){console.log(parameters);
    var query = '';
    var identifiers = 0;
    var queryData = [];
    query += 'SELECT * FROM cart_master ';
    if(parameters.service_details != undefined && parameters.service_details==true){
        query += ' INNER JOIN subscription_detail ON  subscription_detail.id=cart_master.service_detail_id';
        query += ' INNER JOIN service_master ON service_master.id=cart_master.service_id';
    }
    query += ' WHERE cart_master.company_id=?';
    queryData[identifiers++] = parameters.where.company_id;
    if(parameters.where.service_id!=undefined) {
        query += ' AND cart_master.service_id=?';
        queryData[identifiers++] = parameters.where.service_id;
    }    
    mysqlDb.dbQuery(query, queryData, function(result){
        var response = {};
        response.status = false;
        if(result.length){
            response.status = true;
            response.data = result;
            cb(response);
        }else{
            cb(response);
        }
    });    
}
module.exports.getCouponList = function(parameters, cb){
    var query = '';
    var identifiers = 0;
    var queryData = [];
    query += 'SELECT * FROM coupon_master ';
    if(parameters.where.company_id != undefined) {
        query += ' WHERE coupon_master.company_id IN(?)';
        queryData[identifiers++] = [parameters.where.company_id,0];
        if(parameters.where.coupon_code!=undefined) {
            query += ' AND coupon_master.coupon_code=?';
            queryData[identifiers++] = parameters.where.coupon_code;
        }        
        query += ' AND coupon_master.activation_date <=CURDATE() AND expiry_date>=CURDATE()';        
    }    
    mysqlDb.dbQuery(query, queryData, function(result){
        var response = {};
        response.status = false;
        if(result.length){
            response.status = true;
            if(parameters.servcieDetails != undefined && parameters.servcieDetails == true){
                result = result[0];
            }
            response.data = result;
            cb(response);
        }else{
            cb(response);
        }
    });    
};

module.exports.applyCoupon = function(parameters, cb){
    var query = '';
    var queryData = [];
    var identifiers = 0;
    query = 'DELETE FROM applied_coupon ';
    query += ' Where company_id=?';
    queryData[identifiers++] = parameters.where.company_id;
    //query += 'INSERT INTO cart_master set ?';
    mysqlDb.dbQuery(query, queryData, function(result){
        query = '';
        queryData = parameters.fieldToAdd;
        query += 'INSERT INTO applied_coupon set ?';
        mysqlDb.dbQuery(query, queryData, function(result){
            var response = {};
            response.status = false;
            if(result.insertId){
                response.status = true;
                response.data = result;
                cb(response);
            }else{
                cb(response);
            }            
        });
    });    
}
module.exports.getAppliedCoupon = function(parameters, cb){
    var query = '';
    var queryData = [];
    var identifiers = 0;
    var columns = ['coupon_master.coupon_code', 'coupon_master.type'];
    query += 'SELECT * FROM applied_coupon ';    
    query += ' INNER JOIN coupon_master ON coupon_master.id = applied_coupon.coupon_id';
    query += ' WHERE applied_coupon.company_id = ?';
    queryData[identifiers++] = parameters.where.company_id;
    query += ' AND coupon_master.activation_date <=CURDATE() AND coupon_master.expiry_date>=CURDATE()';
    mysqlDb.dbQuery(query, queryData, function(result){
        var response = {};
        response.status = false;
        if(result.length){
            response.status = true;
            response.data = result[0];
            cb(response);
        }else{
            cb(response);
        }        
    });    
}
