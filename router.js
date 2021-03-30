var userlib = require('./library/userlib');
var productlib = require('./library/productlib');
var sess = '';
module.exports = function(app){
    app.use(function(req, res, next){
        if(sess.userDetail == undefined){
            res.locals.session = ''; 
        }else{
            res.locals.session = sess.userDetail; 
        }
        next();
    });    
    app.get('/', function(req, res){

        //ses = req.session;
        //ses.email = 'ravi@gmail.com';
        res.render('index', {data:{}});
    });
    app.get('/login', function(req, res){
        if(sess != '' && sess.userDetail != undefined){
           res.redirect('/'); 
        }else{
            result = {};
            redirecToView(req, res, result);
        }
    });
    app.get('/register', function(req, res){
        if(sess != ''){
           res.redirect('/'); 
        }
        res.render('layout', {'views':'register'});
    }); 
    app.post('/saveUser', function(req, res){
        if(sess != ''){
           res.redirect('/'); 
        }
        userlib.saveUserData(req.body, function(result){
        });
        //res.send({'data':ses.email});
        //console.log('sss');
        res.render('register');
    });  
    app.post('/loginUser', function(req, res){
        if(sess != ''){
           res.redirect('/'); 
        }
        userlib.getUserDetail(req.body, function(result){
            sess = req.session;
            if(result.length>0){
                sess.userDetail = result;
            }
            if(sess.userDetail != undefined && sess.userDetail != ''){
               res.redirect('/'); 
            }else{        
                sess = '';
                res.redirect('login');            
            }
        });
        //res.send({'data':ses.email});
        //console.log('sss');

    });    
    app.get('/productList', function(req, res){
        var filters =  {};
        var sortBy = {};
        if(req.query.categoryId != undefined){
            filters.categoryId = req.query.categoryId;
        }
        if(req.query.skuNo != undefined){
            filters.skuNo = req.query.skuNo;
        }        
        if(req.query.productName != undefined){
            filters.productName = req.query.productName;
        }        
        if(req.query.productPrice != undefined){
            filters.productPrice = req.query.productPrice;
        }        
        if(req.query.upperProductPrice != undefined){
            filters.upperProductPrice = req.query.upperProductPrice;
        }
        if(req.query.lowerProductPrice != undefined){
            filters.lowerProductPrice = req.query.lowerProductPrice;
        }
        if(req.query.sortBy != undefined){
            if(req.query.sortBy<=1){
                sortBy.price = req.query.sortBy;
            }else if(req.query.sortBy>1){
                filters.lowerProductPrice = req.query.lowerProductPrice;
            }
        }
        //console.log(req.query);
        productlib.getProducts(filters, sortBy, function(result){
            redirecToView(req, res, result);
        });
        //res.send(req.params.categoryId);
    });     
    function redirecToView(req, res, data){
        var path = req.route.path.substr(1, req.route.path.lenght);
        res.render('layout', {"data":data,"views":path});
    }
    
    
}